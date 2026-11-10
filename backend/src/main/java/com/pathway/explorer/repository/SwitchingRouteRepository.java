package com.pathway.explorer.repository;

import com.pathway.explorer.model.SwitchingRoute;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SwitchingRouteRepository extends MongoRepository<SwitchingRoute, String> {
    List<SwitchingRoute> findByDifficultyIgnoreCase(String difficulty);

    @Query("{ $or: [ { 'title': { $regex: ?0, $options: 'i' } }, { 'fromDomain': { $regex: ?0, $options: 'i' } }, { 'toDomain': { $regex: ?0, $options: 'i' } } ] }")
    List<SwitchingRoute> searchSwitchingRoutes(String keyword);
}
