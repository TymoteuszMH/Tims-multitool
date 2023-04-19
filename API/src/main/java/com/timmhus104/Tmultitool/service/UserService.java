package com.timmhus104.Tmultitool.service;

import com.timmhus104.Tmultitool.exception.UserNotFoundException;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser (User user){
        if(userRepo.existsByUsername(user.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        return userRepo.save(user);
    }
    public User Login(User user){
        if( userRepo.existsByUsername(user.getUsername())
                && userRepo.existsByPassword(user.getPassword())){
            return userRepo.findByUsername(user.getUsername());
        }
        throw new RuntimeException("Username or password are incorrect");
    }
    public User updateUser(User user){
        if(userRepo.existsByUsername(user.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        return userRepo.save(user);
    }

    public void deleteUser(Long id){
        userRepo.deleteUserById(id);
    }
}
