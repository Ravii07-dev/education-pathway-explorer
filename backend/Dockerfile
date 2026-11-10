# Build Stage using OpenJDK 21
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY . .
RUN mkdir -p bin && \
    javac -d bin -encoding UTF-8 $(find src/main/java -name "*.java")

# Runtime Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/bin ./bin
COPY src/main/resources ./src/main/resources

EXPOSE 8080
ENTRYPOINT ["java", "-cp", "bin", "com.pathway.explorer.PathwayBackendApplication"]
