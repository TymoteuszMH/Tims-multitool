package com.timmhus104.Tmultitool.model.Todo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.timmhus104.Tmultitool.enumeration.Status;
import jakarta.persistence.*;

//todo list each element
@Entity
public class TodoElement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "todo_id", referencedColumnName = "id", nullable = false, updatable = false)
    @JsonBackReference
    private TodoList todoList;
    @Column(nullable = false)
    private Status status;

    public TodoElement(){}

    public TodoElement(String content, TodoList todoList, Status status){
        this.content = content;
        this.todoList = todoList;
        this.status = status;
    }

    //getters and setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public TodoList getTodoList() {
        return todoList;
    }
    public void setTodoList(TodoList todoList) {
        this.todoList = todoList;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }
}
