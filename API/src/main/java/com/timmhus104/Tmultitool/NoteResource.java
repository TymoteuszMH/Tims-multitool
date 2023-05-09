package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.model.Note;
import com.timmhus104.Tmultitool.service.NoteService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "https://tims-multitool.vercel.app")
@RestController
@RequestMapping("/{userUuid}/note")
public class NoteResource {
    private final NoteService noteService;

    public NoteResource(NoteService noteService) {
        this.noteService = noteService;
    }

    //getting all notes attached to user
    @GetMapping("/all")
    public ResponseEntity<List<Note>> getNotes(@PathVariable("userUuid") UUID userUuid) {
        List<Note> note = noteService.findNoteByUser(userUuid);
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    //id is for showing details
    @GetMapping("/id/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") Long id) {
        Note note = noteService.findNoteById(id);
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    //adding note
    @PostMapping("/add")
    public ResponseEntity<Note> addNote(@RequestBody Note note, @PathVariable("userUuid") UUID userUuid) {
        Note newNote = noteService.addNote(note, userUuid);
        return new ResponseEntity<>(newNote, HttpStatus.CREATED);
    }

    //updating by id
    @PutMapping("/update/{id}")
    public ResponseEntity<Note> updateNote(@RequestBody Note note, @PathVariable("id") Long id) {
        Note upNote = noteService.updateNote(note, id);
        return new ResponseEntity<>(upNote, HttpStatus.OK);
    }

    //deleting note
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteNote(@PathVariable("id") Long id) {
        noteService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}