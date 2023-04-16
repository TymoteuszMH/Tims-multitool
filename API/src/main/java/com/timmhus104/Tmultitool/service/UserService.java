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
        return userRepo.save(user);
    }
    public User findOneUsernameAndPassword(String username, String password){
        return userRepo.findUserByUsernameAndPassword(username, password).orElseThrow(() -> new UserNotFoundException("not-found"));
    }
    public User updateUser(User user){
        return userRepo.save(user);
    }

    public void deleteUser(Long id){
        userRepo.deleteUserById(id);
    }
}
