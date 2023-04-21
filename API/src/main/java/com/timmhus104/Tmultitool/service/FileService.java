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
    private final UserRepo userRepo;

    @Autowired
    public FileService(FileRepo fileRepo, UserRepo userRepo) {
        this.fileRepo = fileRepo;
        this.userRepo = userRepo;
    }


    public File addFile (File file, UUID userId){
        User user = getUser(userId);
        file.setUser(user);
        user.getFiles().add(file);
        return fileRepo.save(file);
    }

    public File updateFile (File file, Long id){
        file.setId(id);
        return fileRepo.save(file);
    }

    public File findFileById(Long id){
        return fileRepo.findFileById(id).orElseThrow(() -> new FileNotFoundException("File not found"));
    }
    public List<File> findFileByTypeAndUser(Type type){
        return fileRepo.findFileByType(type);
    }
    public void deleteFile(Long id){
        fileRepo.deleteFileById(id);
    }

    private User getUser(UUID userUuid) {
        User user = userRepo.findByUuid(userUuid);
        Optional<User> owner = userRepo.findById(user.getId());
        if (owner.isPresent()) {
            return owner.get();
        }
        throw new UserNotFoundException("User not found!");

    }
}
