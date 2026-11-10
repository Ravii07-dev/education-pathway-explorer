# ☕ Version 1: Core Java 21 HTTP Server (No Frameworks)

This directory preserves the **v1 bare-metal core Java backend**.

### Engineering Purpose:
Before introducing Spring Boot, this backend was built strictly using standard Java 21 LTS standard libraries:
- Embedded `HttpServer` (`com.sun.net.httpserver`)
- Java 21 Project Loom **Virtual Threads** (`Executors.newVirtualThreadPerTaskExecutor()`)
- Bare-metal JSON serialization & regex parsing
- File persistence & raw MongoDB SRV DNS socket resolution

Having this version preserved alongside the modern Spring Boot 3 enterprise rewrite demonstrates an in-depth understanding of:
1. Low-level HTTP lifecycle & sockets
2. Virtual Thread concurrency vs thread pools
3. Exactly what abstractions Spring Boot provides under the hood
