package com.timmhus104.Tmultitool.repo;

import com.timmhus104.Tmultitool.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepo extends JpaRepository<Note, Long> {
    //all speaks for itself
    Optional<Note> findNoteById(Long id);
    List<Note> findNoteByUser(Long userId);
    void deleteNoteById(Long id);
}