package com.pathway.explorer.repository;

import com.pathway.explorer.model.Career;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRepository extends MongoRepository<Career, String> {
    Page<Career> findByDomainIgnoreCase(String domain, Pageable pageable);
    List<Career> findByDomainIgnoreCase(String domain);

    @Query("{ $or: [ { 'title': { $regex: ?0, $options: 'i' } }, { 'shortDesc': { $regex: ?0, $options: 'i' } }, { 'skills': { $regex: ?0, $options: 'i' } } ] }")
    List<Career> searchCareers(String keyword);
}
