package com.timmhus104.Tmultitool.model.Todo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.timmhus104.Tmultitool.model.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//user's todo list
@Entity
public class TodoList implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, updatable = false)
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private String title;

    @OneToMany(mappedBy = "todoList", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TodoElement> todoElement = new ArrayList<>();

    private LocalDate date;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public TodoList(){}

    public TodoList(User user, String title, List<TodoElement> todoElement, LocalDate date, LocalDateTime createdAt, LocalDateTime updatedAt){
        this.user = user;
        this.title = title;
        this.todoElement = todoElement;
        this.date = date;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //getters and setters

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public User getUser(){
        return user;
    }
    public void setUser(User user){
        this.user = user;
    }

    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }

    public List<TodoElement> getTodoElement() {
        return todoElement;
    }
    public void setTodoElement(List<TodoElement> todoElement) {
        this.todoElement = todoElement;
    }

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}