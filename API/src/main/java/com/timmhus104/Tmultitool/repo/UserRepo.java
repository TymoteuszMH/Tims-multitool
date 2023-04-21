package com.timmhus104.Tmultitool.repo;

import com.timmhus104.Tmultitool.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional
public interface UserRepo extends JpaRepository<User, Long> {
    //used to check if username is already taken
    boolean existsByUsername(String username);
    //used to update file to get updated user
    boolean existsByUsernameAndUuid(String username, UUID uuid);
    //used to logging in
    boolean existsByUsernameAndPassword(String username, String password);
    User findByUuid(UUID uuid);
    User findByUsername(String username);
    void deleteUserByUuid(UUID uuid);
}
