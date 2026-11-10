package com.pathway.explorer.repository;

import com.pathway.explorer.model.EntranceExam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntranceExamRepository extends MongoRepository<EntranceExam, String> {
    List<EntranceExam> findByDifficultyIgnoreCase(String difficulty);

    @Query("{ $or: [ { 'name': { $regex: ?0, $options: 'i' } }, { 'fullName': { $regex: ?0, $options: 'i' } }, { 'conductingBody': { $regex: ?0, $options: 'i' } } ] }")
    List<EntranceExam> searchExams(String keyword);
}
