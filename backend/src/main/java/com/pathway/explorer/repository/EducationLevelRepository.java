package com.pathway.explorer.repository;

import com.pathway.explorer.model.EducationLevel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationLevelRepository extends MongoRepository<EducationLevel, String> {
}
