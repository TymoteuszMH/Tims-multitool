package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.exception.UserNotFoundException;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping ("/user")
public class UserResource {
    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public ResponseEntity<User> getUserByUsernameAndPassword(@RequestBody User user){
        User login = userService.Login(user);
        return new ResponseEntity<>(login, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{uuid}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable("uuid") UUID uuid){
        User upUser = userService.updateUser(user, uuid);
        return new ResponseEntity<>(upUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{uuid}")
    @Transactional
    public ResponseEntity<?> deleteUser(@PathVariable("uuid") UUID uuid){
        userService.deleteUser(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
