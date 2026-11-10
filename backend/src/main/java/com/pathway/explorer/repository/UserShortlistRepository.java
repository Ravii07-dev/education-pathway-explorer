package com.pathway.explorer.repository;

import com.pathway.explorer.model.UserShortlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserShortlistRepository extends MongoRepository<UserShortlist, String> {
    List<UserShortlist> findByUserId(String userId);
    Optional<UserShortlist> findByUserIdAndItemIdAndItemType(String userId, String itemId, String itemType);
    void deleteByUserIdAndItemTypeAndItemId(String userId, String itemType, String itemId);
    void deleteByUserId(String userId);
}
