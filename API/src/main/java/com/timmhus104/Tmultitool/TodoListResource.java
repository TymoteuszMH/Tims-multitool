package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.model.Todo.TodoList;
import com.timmhus104.Tmultitool.service.todoService.TodoListService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/{userUuid}/todoList")
public class TodoListResource {
    private final TodoListService todoListService;

    public TodoListResource(TodoListService todoListService) {
        this.todoListService = todoListService;
    }

    //getting all todo lists attached to user
    @GetMapping("/all")
    public ResponseEntity<List<TodoList>> getTodoList(@PathVariable("userUuid") UUID userUuid) {
        List<TodoList> todoList = todoListService.findTodoListByUser(userUuid);
        return new ResponseEntity<>(todoList, HttpStatus.OK);
    }

    //id is for showing details
    @GetMapping("/id/{id}")
    public ResponseEntity<TodoList> getTodoListById(@PathVariable("id") Long id) {
        TodoList todoList = todoListService.findTodoListById(id);
        return new ResponseEntity<>(todoList, HttpStatus.OK);
    }

    //adding todo list
    @PostMapping("/add")
    public ResponseEntity<TodoList> addTodoList(@RequestBody TodoList todoList, @PathVariable("userUuid") UUID userUuid) {
        TodoList newTodoList = todoListService.addTodoList(todoList, userUuid);
        return new ResponseEntity<>(newTodoList, HttpStatus.CREATED);
    }

    //updating by id
    @PutMapping("/update/{id}")
    public ResponseEntity<TodoList> updateTodoList(@RequestBody TodoList todoList, @PathVariable("id") Long id) {
        TodoList upTodoList = todoListService.updateTodoList(todoList, id);
        return new ResponseEntity<>(upTodoList, HttpStatus.OK);
    }

    //deleting todo list
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteTodoList(@PathVariable("id") Long id) {
        todoListService.deleteTodoList(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}