package com.pathway.explorer;

import com.pathway.explorer.repository.PathwayRepository;
import com.pathway.explorer.service.JsonUtils;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

public class DataExporter {
    public static void main(String[] args) throws Exception {
        PathwayRepository repo = new PathwayRepository();
        Map<String, Object> matrix = Map.of(
            "levels", repo.getAllLevels(),
            "courses", repo.getAllCourses(),
            "exams", repo.getAllExams(),
            "careers", repo.getAllCareers(),
            "switchingRoutes", repo.getAllSwitchingRoutes()
        );
        Files.createDirectories(Paths.get("data"));
        Files.writeString(Paths.get("data/seed_matrix.json"), JsonUtils.toJson(matrix));
        System.out.println("SEED_OK: Exported " + repo.getAllCourses().size() + " courses, " + repo.getAllCareers().size() + " careers, " + repo.getAllExams().size() + " exams.");
    }
}
