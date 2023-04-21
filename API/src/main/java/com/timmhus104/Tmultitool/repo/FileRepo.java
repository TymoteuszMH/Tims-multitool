package com.timmhus104.Tmultitool.repo;

import com.timmhus104.Tmultitool.enumeration.Type;
import com.timmhus104.Tmultitool.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface FileRepo extends JpaRepository<File, Long> {

    Optional<File> findFileById(Long id);
    List<File> findFileByType(Type type);
    void deleteFileById(Long id);
}
