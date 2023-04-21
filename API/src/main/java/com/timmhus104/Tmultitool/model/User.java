package com.timmhus104.Tmultitool.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//User's modal
@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    //uuid is used to authenticate user's activity
    private UUID uuid = UUID.randomUUID();
    @Column(unique = true)
    private String username;
    private String password;
    //reference from file modal, after removing user, all his files will be deleted
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<File> files = new ArrayList<>();
    public User(){}

    public User(String username, String password, List<File> files){
        this.username = username;
        this.password = password;
        this.files = files;
    }

    //setters and getters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUuid(){
        return uuid;
    }
    public void setUuid(UUID uuid){
        this.uuid = uuid;
    }

    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }

    public List<File> getFiles(){
        return files;
    }
    public void setFiles(List<File> files){
        this.files = files;
    }
}
