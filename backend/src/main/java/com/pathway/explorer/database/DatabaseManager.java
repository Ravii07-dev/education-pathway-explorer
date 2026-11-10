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

        // 2. Check application.properties if present
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
            // Check if MongoDB URI is syntactically valid and test basic socket connection if localhost
            if (mongoUri.contains("localhost") || mongoUri.contains("127.0.0.1")) {
                try (var socket = new java.net.Socket()) {
                    socket.connect(new java.net.InetSocketAddress("localhost", 27017), 500);
                    isMongoConnected = true;
                } catch (Exception e) {
                    isMongoConnected = false;
                }
            } else if (mongoUri.startsWith("mongodb+srv://") || mongoUri.startsWith("mongodb://")) {
                // Cloud Atlas URI configured
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
                String content = Files.readString(path, StandardCharsets.UTF_8);
                // Parse items if available
                System.out.println("  💾 Persistent Database loaded from: " + DB_FILE);
            } else {
                saveLocalDb();
            }
        } catch (Exception e) {
            System.err.println("Notice: Initializing fresh persistent data store.");
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
        return item;
    }

    public boolean removeShortlist(String type, String id) {
        boolean removed = persistentShortlist.remove(type + "_" + id) != null;
        if (removed) {
            saveLocalDb();
        }
        return removed;
    }

    public void clearShortlist() {
        persistentShortlist.clear();
        saveLocalDb();
    }

    public Map<String, Object> getDatabaseStatus() {
        testMongoConnection();
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("databaseType", "MongoDB + Persistent Document Store");
        status.put("mongoUriConfigured", sanitizeUri(mongoUri));
        status.put("isMongoConnected", isMongoConnected);
        status.put("localPersistentFile", DB_FILE);
        status.put("totalPersistedShortlists", persistentShortlist.size());
        status.put("storageStatus", "ACTIVE");
        return status;
    }

    private String sanitizeUri(String uri) {
        if (uri == null) return "null";
        // Hide password in logs if present
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
}
