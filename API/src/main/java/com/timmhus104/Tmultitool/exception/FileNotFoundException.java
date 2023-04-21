package com.timmhus104.Tmultitool.exception;

public class FileNotFoundException extends RuntimeException{
    //exception for file not found
    public FileNotFoundException(String message) {
        super(message);
    }
}