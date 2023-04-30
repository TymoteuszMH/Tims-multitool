package com.timmhus104.Tmultitool.enumeration;

public enum Status {
    DONE("1"),
    UNDONE("0");
    private final String status;

    //getter and setter
    Status(String status){
        this.status = status;
    }

    public String getStatus(){
        return this.status;
    }
}