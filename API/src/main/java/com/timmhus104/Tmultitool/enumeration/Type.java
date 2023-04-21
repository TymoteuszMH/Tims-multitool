package com.timmhus104.Tmultitool.enumeration;

//types of file, used in file modal
public enum Type {
    note("note"),
    todo("todo"),
    event("event");
    private final String type;

    //getter and setter
    Type(String type){
        this.type = type;
    }

    public String getType(){
        return this.type;
    }
}
