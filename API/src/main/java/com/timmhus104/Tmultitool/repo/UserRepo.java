package com.timmhus104.Tmultitool.repo;

import com.timmhus104.Tmultitool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    boolean existsByPassword(String password);
    User findByUsername(String username);

    void deleteUserById(Long id);
}
