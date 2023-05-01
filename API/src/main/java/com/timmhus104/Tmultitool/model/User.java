package com.timmhus104.Tmultitool.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.timmhus104.Tmultitool.model.Todo.TodoList;
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
    @Column(nullable = false, updatable = false)
    private UUID uuid = UUID.randomUUID();
    @Column(unique = true)
    private String username;
    private String password;
    //reference from file modal, after removing user, all his files will be deleted
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Note> notes = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TodoList> todos = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Event> events = new ArrayList<>();
    public User(){}

    public User(String username, String password, List<Note> notes, List<TodoList> todos, List<Event> events){
        this.username = username;
        this.password = password;
        this.notes = notes;
        this.todos = todos;
        this.events = events;
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

    public List<Note> getNotes(){
        return notes;
    }
    public void setNotes(List<Note> notes){
        this.notes = notes;
    }

    public List<TodoList> getTodos() {
        return todos;
    }
    public void setTodos(List<TodoList> todos) {
        this.todos = todos;
    }

    public List<Event> getEvents() {
        return events;
    }
    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
