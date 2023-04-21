package com.timmhus104.Tmultitool.enumeration;

public enum Type {
    note("note"),
    todo("todo");

    private final String type;

    Type(String type){
        this.type = type;
    }

    public String getType(){
        return this.type;
    }
}
