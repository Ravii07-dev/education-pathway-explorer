package com.pathway.explorer;

import com.pathway.explorer.model.ShortlistItem;
import com.pathway.explorer.repository.PathwayRepository;
import com.pathway.explorer.service.JsonUtils;
import com.pathway.explorer.service.PathwayService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.Executors;

public class PathwayBackendApplication {

    private static final int PORT = 8080;
    private static final PathwayRepository repository = new PathwayRepository();
    private static final PathwayService service = new PathwayService(repository);

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        // Leverage Java 21 Virtual Threads for high-throughput concurrent I/O
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());

        server.createContext("/", new MainHttpHandler());

        server.start();
        System.out.println("==================================================================");
        System.out.println("  🎓 Education Pathway Explorer - Java Backend (JDK 21 LTS)");
        System.out.println("  🚀 REST API Server running on: http://localhost:" + PORT + "/api");
        System.out.println("  ⚡ Health check: http://localhost:" + PORT + "/api/health");
        System.out.println("  🧭 Interactive Endpoints:");
        System.out.println("     - GET  /api/levels");
        System.out.println("     - GET  /api/courses");
        System.out.println("     - GET  /api/careers");
        System.out.println("     - GET  /api/exams");
        System.out.println("     - GET  /api/switching-routes");
        System.out.println("     - GET  /api/search?q={keyword}");
        System.out.println("     - GET  /api/shortlist");
        System.out.println("     - POST /api/shortlist");
        System.out.println("==================================================================");
    }

    static class MainHttpHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Apply universal CORS headers
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");

            String method = exchange.getRequestMethod();
            if ("OPTIONS".equalsIgnoreCase(method)) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            String path = exchange.getRequestURI().getPath();
            String query = exchange.getRequestURI().getQuery();
            Map<String, String> queryParams = parseQueryParams(query);

            try {
                if (path.startsWith("/api/")) {
                    handleApi(exchange, method, path, queryParams);
                } else {
                    handleStatic(exchange, path);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
                sendJsonResponse(exchange, 500, "{\"error\":\"" + JsonUtils.escape(ex.getMessage()) + "\"}");
            }
        }

        private void handleApi(HttpExchange exchange, String method, String path, Map<String, String> params) throws IOException {
            // 1. Health & Database Status
            if (path.equals("/api/health") && "GET".equalsIgnoreCase(method)) {
                String res = String.format(
                    "{\"status\":\"UP\",\"service\":\"Education Pathway Explorer Java Backend\",\"javaVersion\":\"%s\",\"mongoConfigured\":%s,\"timestamp\":\"%s\"}",
                    System.getProperty("java.version"), repository.getDatabaseManager().isMongoConnected(), Instant.now().toString()
                );
                sendJsonResponse(exchange, 200, res);
                return;
            }

            if (path.equals("/api/db-status") && "GET".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, JsonUtils.toJson(repository.getDatabaseManager().getDatabaseStatus()));
                return;
            }

            // 2. Levels
            if (path.equals("/api/levels") && "GET".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, JsonUtils.toJson(service.getLevels()));
                return;
            }
            if (path.startsWith("/api/levels/") && "GET".equalsIgnoreCase(method)) {
                String id = path.substring("/api/levels/".length());
                service.getLevel(id).ifPresentOrElse(
                    level -> {
                        try { sendJsonResponse(exchange, 200, JsonUtils.toJson(level)); }
                        catch (IOException ignored) {}
                    },
                    () -> {
                        try { sendJsonResponse(exchange, 404, "{\"error\":\"Level not found\"}"); }
                        catch (IOException ignored) {}
                    }
                );
                return;
            }

            // 3. Courses
            if (path.equals("/api/courses") && "GET".equalsIgnoreCase(method)) {
                String domain = params.get("domain");
                String levelId = params.get("levelId");
                sendJsonResponse(exchange, 200, JsonUtils.toJson(service.getCourses(domain, levelId)));
                return;
            }
            if (path.startsWith("/api/courses/") && "GET".equalsIgnoreCase(method)) {
                String id = path.substring("/api/courses/".length());
                service.getCourse(id).ifPresentOrElse(
                    c -> {
                        try { sendJsonResponse(exchange, 200, JsonUtils.toJson(c)); }
                        catch (IOException ignored) {}
                    },
                    () -> {
                        try { sendJsonResponse(exchange, 404, "{\"error\":\"Course not found\"}"); }
                        catch (IOException ignored) {}
                    }
                );
                return;
            }

            // 4. Careers
            if (path.equals("/api/careers") && "GET".equalsIgnoreCase(method)) {
                String domain = params.get("domain");
                sendJsonResponse(exchange, 200, JsonUtils.toJson(service.getCareers(domain)));
                return;
            }
            if (path.startsWith("/api/careers/") && "GET".equalsIgnoreCase(method)) {
                String id = path.substring("/api/careers/".length());
                service.getCareer(id).ifPresentOrElse(
                    car -> {
                        try { sendJsonResponse(exchange, 200, JsonUtils.toJson(car)); }
                        catch (IOException ignored) {}
                    },
                    () -> {
                        try { sendJsonResponse(exchange, 404, "{\"error\":\"Career not found\"}"); }
                        catch (IOException ignored) {}
                    }
                );
                return;
            }

            // 5. Entrance Exams
            if (path.equals("/api/exams") && "GET".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, JsonUtils.toJson(service.getExams()));
                return;
            }
            if (path.startsWith("/api/exams/") && "GET".equalsIgnoreCase(method)) {
                String id = path.substring("/api/exams/".length());
                service.getExam(id).ifPresentOrElse(
                    exm -> {
                        try { sendJsonResponse(exchange, 200, JsonUtils.toJson(exm)); }
                        catch (IOException ignored) {}
                    },
                    () -> {
                        try { sendJsonResponse(exchange, 404, "{\"error\":\"Entrance exam not found\"}"); }
                        catch (IOException ignored) {}
                    }
                );
                return;
            }

            // 6. Switching Routes
            if (path.equals("/api/switching-routes") && "GET".equalsIgnoreCase(method)) {
                String difficulty = params.get("difficulty");
                sendJsonResponse(exchange, 200, JsonUtils.toJson(service.getSwitchingRoutes(difficulty)));
                return;
            }

            // 7. Global Search
            if (path.equals("/api/search") && "GET".equalsIgnoreCase(method)) {
                String q = params.get("q");
                sendJsonResponse(exchange, 200, JsonUtils.toJson(service.search(q)));
                return;
            }

            // 8. Shortlist
            if (path.equals("/api/shortlist") && "GET".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 200, JsonUtils.toJson(service.getShortlist()));
                return;
            }
            if (path.equals("/api/shortlist") && "POST".equalsIgnoreCase(method)) {
                String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
                // Parse simple json fields
                String id = extractJsonField(body, "id");
                String type = extractJsonField(body, "type");
                String title = extractJsonField(body, "title");
                String subtitle = extractJsonField(body, "subtitle");
                String domain = extractJsonField(body, "domain");
                String userNotes = extractJsonField(body, "userNotes");

                if (id == null || type == null) {
                    sendJsonResponse(exchange, 400, "{\"error\":\"id and type required\"}");
                    return;
                }

                ShortlistItem item = new ShortlistItem(id, type, title != null ? title : "", subtitle != null ? subtitle : "", domain != null ? domain : "", Instant.now().toString(), userNotes != null ? userNotes : "");
                ShortlistItem saved = service.addToShortlist(item);
                sendJsonResponse(exchange, 201, JsonUtils.toJson(saved));
                return;
            }
            if (path.startsWith("/api/shortlist/") && "DELETE".equalsIgnoreCase(method)) {
                String sub = path.substring("/api/shortlist/".length());
                String[] parts = sub.split("/");
                if (parts.length >= 2) {
                    boolean removed = service.removeFromShortlist(parts[0], parts[1]);
                    sendJsonResponse(exchange, 200, "{\"success\":" + removed + "}");
                } else {
                    sendJsonResponse(exchange, 400, "{\"error\":\"Format: /api/shortlist/{type}/{id}\"}");
                }
                return;
            }
            if (path.equals("/api/shortlist/export") && "POST".equalsIgnoreCase(method)) {
                String markdown = service.exportShortlistMarkdown();
                exchange.getResponseHeaders().set("Content-Type", "text/markdown; charset=UTF-8");
                byte[] bytes = markdown.getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(bytes);
                }
                return;
            }

            // Not found
            sendJsonResponse(exchange, 404, "{\"error\":\"Endpoint not found\"}");
        }

        private void handleStatic(HttpExchange exchange, String path) throws IOException {
            Path distPath = Paths.get("../dist").toAbsolutePath().normalize();
            if (!Files.exists(distPath)) {
                distPath = Paths.get("dist").toAbsolutePath().normalize();
            }

            if (!Files.exists(distPath)) {
                String welcomeHtml = """
                    <!DOCTYPE html>
                    <html>
                    <head><title>Education Pathway Explorer - Java Backend</title>
                    <style>body{font-family:sans-serif;padding:40px;line-height:1.6;background:#f8fafc;color:#1e293b}
                    h1{color:#026fc7}.card{background:white;padding:24px;border-radius:16px;border:1px solid #e2e8f0;max-width:650px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05)}
                    code{background:#f1f5f9;padding:3px 8px;border-radius:6px;font-size:13px;color:#0f172a}
                    a{color:#026fc7;text-decoration:none;font-weight:600} a:hover{text-decoration:underline}
                    </style></head>
                    <body>
                    <div class="card">
                      <h1>Java Backend REST API is Running!</h1>
                      <p>The high-performance Java 21 backend for <strong>Education Pathway Explorer</strong> is operational.</p>
                      <h3>Available REST Endpoints:</h3>
                      <ul>
                        <li><a href="/api/health">/api/health</a> - Server status & JVM stats</li>
                        <li><a href="/api/levels">/api/levels</a> - Indian education streams & stages</li>
                        <li><a href="/api/courses">/api/courses</a> - Full degree catalogue</li>
                        <li><a href="/api/careers">/api/careers</a> - 21st-century careers with all routes</li>
                        <li><a href="/api/exams">/api/exams</a> - Entrance exams (JEE, UCEED, NID, etc.)</li>
                        <li><a href="/api/switching-routes">/api/switching-routes</a> - Zero-fear switching guides</li>
                      </ul>
                    </div>
                    </body>
                    </html>
                    """;
                exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                byte[] bytes = welcomeHtml.getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) { os.write(bytes); }
                return;
            }

            String target = path.equals("/") ? "/index.html" : path;
            Path filePath = distPath.resolve(target.startsWith("/") ? target.substring(1) : target).normalize();

            if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
                filePath = distPath.resolve("index.html");
            }

            String contentType = "text/html";
            String fn = filePath.getFileName().toString().toLowerCase();
            if (fn.endsWith(".js")) contentType = "application/javascript";
            else if (fn.endsWith(".css")) contentType = "text/css";
            else if (fn.endsWith(".svg")) contentType = "image/svg+xml";
            else if (fn.endsWith(".json")) contentType = "application/json";
            else if (fn.endsWith(".png")) contentType = "image/png";

            exchange.getResponseHeaders().set("Content-Type", contentType);
            byte[] bytes = Files.readAllBytes(filePath);
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }

        private void sendJsonResponse(HttpExchange exchange, int statusCode, String json) throws IOException {
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(statusCode, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }

        private Map<String, String> parseQueryParams(String query) {
            Map<String, String> map = new HashMap<>();
            if (query == null || query.isBlank()) return map;
            for (String pair : query.split("&")) {
                int eq = pair.indexOf("=");
                if (eq > 0) {
                    String k = URLDecoder.decode(pair.substring(0, eq), StandardCharsets.UTF_8);
                    String v = URLDecoder.decode(pair.substring(eq + 1), StandardCharsets.UTF_8);
                    map.put(k, v);
                } else if (!pair.isBlank()) {
                    map.put(URLDecoder.decode(pair, StandardCharsets.UTF_8), "");
                }
            }
            return map;
        }

        private String extractJsonField(String json, String field) {
            if (json == null) return null;
            String pattern = "\"" + field + "\"\\s*:\\s*\"([^\"]*)\"";
            java.util.regex.Matcher m = java.util.regex.Pattern.compile(pattern).matcher(json);
            if (m.find()) {
                return m.group(1);
            }
            return null;
        }
    }
}
