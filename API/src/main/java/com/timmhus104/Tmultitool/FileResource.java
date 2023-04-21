package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.enumeration.Type;
import com.timmhus104.Tmultitool.model.File;
import com.timmhus104.Tmultitool.service.FileService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/{userUuid}/file")
public class FileResource {
    private final FileService fileService;

    public FileResource(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<File>> getFiles(@PathVariable("type") Type type){
        List<File> file = fileService.findFileByTypeAndUser(type);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<File> getFileById(@PathVariable("id") Long id){
        File file = fileService.findFileById(id);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<File> addFile(@RequestBody File file, @PathVariable("userUuid") UUID userUuid){
        File newFile = fileService.addFile(file, userUuid);
        return new ResponseEntity<>(newFile, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<File> updateFile(@RequestBody File file, @PathVariable("id") Long id){
        File upFile = fileService.updateFile(file, id);
        return new ResponseEntity<>(upFile, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteFile(@PathVariable("id") Long id){
        fileService.deleteFile(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
