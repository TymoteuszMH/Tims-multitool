package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User upUser = userService.updateUser(user);
        return new ResponseEntity<>(upUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
