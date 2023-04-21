package com.timmhus104.Tmultitool.service;

import com.timmhus104.Tmultitool.enumeration.Type;
import com.timmhus104.Tmultitool.exception.FileNotFoundException;
import com.timmhus104.Tmultitool.exception.UserNotFoundException;
import com.timmhus104.Tmultitool.model.File;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.repo.FileRepo;
import com.timmhus104.Tmultitool.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileService {
    private final FileRepo fileRepo;
    //user repo is for user authentication
    private final UserRepo userRepo;

    @Autowired
    public FileService(FileRepo fileRepo, UserRepo userRepo) {
        this.fileRepo = fileRepo;
        this.userRepo = userRepo;
    }

    //adding file needs uuid from logged user
    public File addFile (File file, UUID userUuid){
        User user = getUser(userUuid);
        file.setUser(user);
        user.getFiles().add(file);
        return fileRepo.save(file);
    }
    //update file doesn't need all null checks 'cause all the data will be passed anyway
    public File updateFile (File file, Long id){
        file.setId(id);
        return fileRepo.save(file);
    }

    //finding file by id
    public File findFileById(Long id){
        return fileRepo.findFileById(id).orElseThrow(() -> new FileNotFoundException("File not found"));
    }
    //getting all files by type attached to user
    public List<File> findFileByTypeAndUser(Type type, UUID userUuid){
        User user = getUser(userUuid);
        return fileRepo.findFileByTypeAndUser(type, user.getId());
    }
    public void deleteFile(Long id){
        fileRepo.deleteFileById(id);
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
