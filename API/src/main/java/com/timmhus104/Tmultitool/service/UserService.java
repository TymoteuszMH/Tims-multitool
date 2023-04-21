package com.timmhus104.Tmultitool.service;

import com.timmhus104.Tmultitool.exception.UserNotFoundException;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User findUserByUuid(UUID uuid){
        return userRepo.findByUuid(uuid);
    }

    public User addUser (User user){
        if(userRepo.existsByUsername(user.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        return userRepo.save(user);
    }
    public User Login(User user){
        if( userRepo.existsByUsernameAndPassword(user.getUsername(), user.getPassword())
                || userRepo.existsByEmailAndPassword(user.getEmail(), user.getPassword())){
            return userRepo.findByUsername(user.getUsername());
        }
        throw new UserNotFoundException("Username or password are incorrect");
    }
    public User updateUser(User user, UUID uuid){
        if(userRepo.existsByUsernameAndUuid(user.getUsername(), uuid)){
            throw new RuntimeException("Username already exists");
        }
        User oldUser = userRepo.findByUuid(uuid);
        user.setId(oldUser.getId());
        if (user.getUsername() == null){
            user.setUsername(oldUser.getUsername());
        }
        if (user.getEmail() == null){
            user.setEmail(oldUser.getEmail());
        }
        if (user.getPassword() == null){
            user.setPassword(oldUser.getPassword());
        }
        return userRepo.save(user);
    }

    public void deleteUser(UUID uuid){
        userRepo.deleteUserByUuid(uuid);
    }
}
