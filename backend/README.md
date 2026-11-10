# Education Pathway Explorer - Java Backend (JDK 21 LTS) ☕

> High-throughput Java 21 REST API server for the Education Pathway Explorer.

---

## 🌟 Highlights

- **Java Version**: **Java 21 LTS**
- **Modern Features**: Java 21 **Records**, **Pattern Matching**, **Virtual Threads** (`Executors.newVirtualThreadPerTaskExecutor()`) for massive concurrency.
- **Universal CORS**: Enabled for seamless cross-origin requests from any frontend (`localhost:3000`, `localhost:3001`, `localhost:5173`).
- **Spring Boot & Maven Ready**: Includes standard `pom.xml` compatible with Spring Boot 3.3+.
- **Zero Third-Party Dependency Overhead**: Can be compiled and started in **under 2 seconds** using native JDK 21 tools alone!

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend status, JVM version & timestamp |
| `GET` | `/api/levels` | List of all education stages (12th PCM, 10th, PCB, Commerce, Arts, Graduation) |
| `GET` | `/api/levels/{id}` | Specific level details with key unlocked streams |
| `GET` | `/api/courses` | All undergraduate programs (Supports `?domain=...` and `?levelId=...`) |
| `GET` | `/api/courses/{id}` | Full course dossier (duration, fees, exams, syllabus) |
| `GET` | `/api/careers` | 21st-century career destinations (Supports `?domain=...`) |
| `GET` | `/api/careers/{id}` | Complete career profile with multiple education routes |
| `GET` | `/api/exams` | National entrance exams (JEE, UCEED, NID, NDA, etc.) |
| `GET` | `/api/exams/{id}` | Exam details, conducting body, syllabus & official portal |
| `GET` | `/api/switching-routes` | Zero-fear lateral entries & career transition guides |
| `GET` | `/api/search?q={query}` | Universal multi-entity search |
| `GET` | `/api/shortlist` | Fetch backend curious shortlist |
| `POST` | `/api/shortlist` | Add / save item to shortlist |
| `DELETE` | `/api/shortlist/{type}/{id}` | Remove item from shortlist |
| `POST` | `/api/shortlist/export` | Generate formatted Markdown export of shortlist |

---

## 🚀 How to Run

### Option 1: Fast Native Script (No Maven download required)
```powershell
cd "C:\Users\ravil\.gemini\antigravity\scratch\education-pathway-explorer\backend"
.\run-backend.ps1
```

### Option 2: Using Maven
```powershell
mvn clean spring-boot:run
```

---

## 📂 Project Structure
```text
backend/
├── pom.xml                                    # Standard Maven & Spring Boot build descriptor
├── run-backend.ps1                            # Instant 1-click compiler & runner using JDK 21
├── bin/                                       # Compiled bytecode classes
└── src/main/java/com/pathway/explorer/
    ├── PathwayBackendApplication.java         # Main application & HTTP Server
    ├── model/                                 # Java 21 Records
    │   ├── EducationLevel.java
    │   ├── Course.java
    │   ├── EntranceExam.java
    │   ├── Career.java
    │   ├── RouteStep.java
    │   ├── SwitchingRoute.java
    │   └── ShortlistItem.java
    ├── repository/
    │   └── PathwayRepository.java             # In-memory thread-safe database
    └── service/
        ├── JsonUtils.java                     # High-performance JSON serializer
        └── PathwayService.java                # Business logic & query engine
```
