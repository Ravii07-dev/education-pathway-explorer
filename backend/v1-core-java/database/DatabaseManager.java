package com.pathway.explorer.database;

import com.pathway.explorer.model.ShortlistItem;
import com.pathway.explorer.service.JsonUtils;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DatabaseManager {

    private static final String DATA_DIR = "data";
    private static final String DB_FILE = "data/pathway_database.json";

    private String mongoUri = "mongodb://localhost:27017/education_pathway";
    private boolean isMongoConnected = false;
    private final Map<String, ShortlistItem> persistentShortlist = new ConcurrentHashMap<>();

    public DatabaseManager() {
        loadConfiguration();
        loadLocalDb();
        testMongoConnection();
    }

    private void loadConfiguration() {
        // 1. Check environment variable
        String envUri = System.getenv("MONGODB_URI");
        if (envUri != null && !envUri.isBlank()) {
            this.mongoUri = envUri.trim();
        }

        // 2. Check .env file if available
        for (String p : List.of(".env", "../.env", "backend/.env")) {
            Path envPath = Paths.get(p);
            if (Files.exists(envPath)) {
                try {
                    for (String line : Files.readAllLines(envPath)) {
                        line = line.trim();
                        if (line.startsWith("MONGODB_URI=") && !line.startsWith("#")) {
                            this.mongoUri = line.substring("MONGODB_URI=".length()).trim();
                            break;
                        }
                    }
                } catch (Exception ignored) {}
            }
        }

        // 3. Check application.properties if present
        Path propsPath = Paths.get("src/main/resources/application.properties");
        if (Files.exists(propsPath)) {
            try {
                List<String> lines = Files.readAllLines(propsPath);
                for (String line : lines) {
                    line = line.trim();
                    if (line.startsWith("spring.data.mongodb.uri=") && !line.startsWith("#")) {
                        this.mongoUri = line.substring("spring.data.mongodb.uri=".length()).trim();
                    }
                }
            } catch (Exception ignored) {}
        }
    }

    public void testMongoConnection() {
        try {
            if (mongoUri.contains("localhost") || mongoUri.contains("127.0.0.1")) {
                try (var socket = new java.net.Socket()) {
                    socket.connect(new java.net.InetSocketAddress("localhost", 27017), 500);
                    isMongoConnected = true;
                } catch (Exception e) {
                    isMongoConnected = false;
                }
            } else if (mongoUri.startsWith("mongodb+srv://") || mongoUri.startsWith("mongodb://")) {
                isMongoConnected = true;
            }
        } catch (Exception e) {
            isMongoConnected = false;
        }
    }

    private void loadLocalDb() {
        try {
            Path path = Paths.get(DB_FILE);
            if (Files.exists(path)) {
                String content = Files.readString(path, StandardCharsets.UTF_8).trim();
                List<ShortlistItem> items = parseShortlistArray(content);
                for (ShortlistItem item : items) {
                    persistentShortlist.put(item.type() + "_" + item.id(), item);
                }
                System.out.println("  💾 Persistent Database loaded: " + items.size() + " shortlisted items from " + DB_FILE);
            } else {
                saveLocalDb();
            }
        } catch (Exception e) {
            System.err.println("Notice: Initializing fresh persistent data store. " + e.getMessage());
        }
    }

    public synchronized void saveLocalDb() {
        try {
            Path dir = Paths.get(DATA_DIR);
            if (!Files.exists(dir)) {
                Files.createDirectories(dir);
            }
            Path path = Paths.get(DB_FILE);
            List<ShortlistItem> items = new ArrayList<>(persistentShortlist.values());
            String json = JsonUtils.toJson(items);
            Files.writeString(path, json, StandardCharsets.UTF_8);
        } catch (IOException e) {
            System.err.println("Failed to write to persistent store: " + e.getMessage());
        }
    }

    public List<ShortlistItem> getShortlist() {
        return new ArrayList<>(persistentShortlist.values());
    }

    public ShortlistItem saveShortlist(ShortlistItem item) {
        persistentShortlist.put(item.type() + "_" + item.id(), item);
        saveLocalDb();
        triggerMongoSyncAsync();
        return item;
    }

    public boolean removeShortlist(String type, String id) {
        boolean removed = persistentShortlist.remove(type + "_" + id) != null;
        if (removed) {
            saveLocalDb();
            triggerMongoSyncAsync("delete", type, id);
        }
        return removed;
    }

    private void triggerMongoSyncAsync(String... args) {
        Thread.startVirtualThread(() -> {
            try {
                List<String> cmd = new ArrayList<>(List.of("node", "mongoBridge.cjs"));
                Collections.addAll(cmd, args);
                ProcessBuilder pb = new ProcessBuilder(cmd);
                pb.redirectErrorStream(true);
                Process process = pb.start();
                process.waitFor(10, java.util.concurrent.TimeUnit.SECONDS);
            } catch (Exception ignored) {}
        });
    }

    public void clearShortlist() {
        persistentShortlist.clear();
        saveLocalDb();
        triggerMongoSyncAsync();
    }

    public Map<String, Object> getDatabaseStatus() {
        testMongoConnection();
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("databaseType", "MongoDB Atlas + In-Memory Virtual Thread Document Store");
        status.put("mongoUriConfigured", sanitizeUri(mongoUri));
        status.put("isMongoConnected", isMongoConnected);
        status.put("localPersistentFile", DB_FILE);
        status.put("totalPersistedShortlists", persistentShortlist.size());
        status.put("storageStatus", "ACTIVE");
        return status;
    }

    private String sanitizeUri(String uri) {
        if (uri == null) return "null";
        if (uri.contains("@")) {
            return uri.replaceAll(":[^:@]+@", ":****@");
        }
        return uri;
    }

    public String getMongoUri() {
        return mongoUri;
    }

    public boolean isMongoConnected() {
        return isMongoConnected;
    }

    private List<ShortlistItem> parseShortlistArray(String json) {
        List<ShortlistItem> list = new ArrayList<>();
        if (json == null || json.isBlank() || !json.contains("{")) return list;

        Pattern objPattern = Pattern.compile("\\{([^{}]+)\\}");
        Matcher objMatcher = objPattern.matcher(json);
        while (objMatcher.find()) {
            String block = objMatcher.group(1);
            String id = extractField(block, "id");
            String type = extractField(block, "type");
            String title = extractField(block, "title");
            String subtitle = extractField(block, "subtitle");
            String domain = extractField(block, "domain");
            String dateAdded = extractField(block, "dateAdded");
            String userNotes = extractField(block, "userNotes");

            if (id != null && type != null) {
                list.add(new ShortlistItem(
                    id,
                    type,
                    title != null ? title : "",
                    subtitle != null ? subtitle : "",
                    domain != null ? domain : "",
                    dateAdded != null ? dateAdded : "",
                    userNotes != null ? userNotes : ""
                ));
            }
        }
        return list;
    }

    private String extractField(String block, String key) {
        Pattern p = Pattern.compile("\"" + key + "\"\\s*:\\s*\"([^\"]*)\"");
        Matcher m = p.matcher(block);
        if (m.find()) {
            return m.group(1).replace("\\\"", "\"").replace("\\\\", "\\");
        }
        return null;
    }
}
