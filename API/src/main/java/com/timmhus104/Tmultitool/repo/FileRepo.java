package com.timmhus104.Tmultitool.repo;

import com.timmhus104.Tmultitool.enumeration.Type;
import com.timmhus104.Tmultitool.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FileRepo extends JpaRepository<File, Long> {
    //all speaks for itself
    Optional<File> findFileById(Long id);
    List<File> findFileByTypeAndUser(Type type, Long userId);
    void deleteFileById(Long id);
}
