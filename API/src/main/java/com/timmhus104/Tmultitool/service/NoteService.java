package com.timmhus104.Tmultitool.service;

import com.timmhus104.Tmultitool.exception.FileNotFoundException;
import com.timmhus104.Tmultitool.exception.UserNotFoundException;
import com.timmhus104.Tmultitool.model.Note;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.repo.NoteRepo;
import com.timmhus104.Tmultitool.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NoteService {
    private final NoteRepo noteRepo;
    //user repo is for user authentication
    private final UserRepo userRepo;

    @Autowired
    public NoteService(NoteRepo noteRepo, UserRepo userRepo) {
        this.noteRepo = noteRepo;
        this.userRepo = userRepo;
    }

    //adding note needs uuid from logged user
    public Note addNote (Note note, UUID userUuid){
        User user = getUser(userUuid);
        note.setUser(user);
        user.getNotes().add(note);
        return noteRepo.save(note);
    }
    //update note doesn't need all null checks 'cause all the data will be passed anyway
    public Note updateNote (Note note, Long id){
        note.setId(id);
        return noteRepo.save(note);
    }

    //finding file by id
    public Note findNoteById(Long id){
        return noteRepo.findNoteById(id).orElseThrow(() -> new FileNotFoundException("File not found"));
    }
    //getting all files by type attached to user
    public List<Note> findNoteByUser(UUID userUuid){
        User user = getUser(userUuid);
        return noteRepo.findNoteByUser(user);
    }
    public void deleteNote(Long id){
        noteRepo.deleteNoteById(id);
    }

    //function to get user by uuid and returning him if exists
    private User getUser(UUID userUuid) {
        User user = userRepo.findByUuid(userUuid);
        Optional<User> owner = userRepo.findById(user.getId());
        if (owner.isPresent()) {
            return owner.get();
        }
        throw new UserNotFoundException("User not found!");
    }
}