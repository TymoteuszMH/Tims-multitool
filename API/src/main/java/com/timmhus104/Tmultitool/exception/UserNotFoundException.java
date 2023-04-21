package com.timmhus104.Tmultitool.exception;

public class UserNotFoundException extends RuntimeException{
    //exception for user not found
    public UserNotFoundException(String message) {
        super(message);
    }
}