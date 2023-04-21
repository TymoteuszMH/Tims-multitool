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
    boolean existsByUsername(String username);
    boolean existsByUsernameAndUuid(String username, UUID uuid);
    boolean existsByUsernameAndPassword(String username, String password);
    boolean existsByEmailAndPassword(String email, String password);
    User findByUuid(UUID uuid);
    User findByUsername(String username);
    void deleteUserByUuid(UUID uuid);
}
