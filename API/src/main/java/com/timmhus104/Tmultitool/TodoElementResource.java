package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.enumeration.Status;
import com.timmhus104.Tmultitool.model.Todo.TodoElement;
import com.timmhus104.Tmultitool.service.todoService.TodoElementService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://tims-multitool.vercel.app")
@RestController
@RequestMapping("/{userUuid}/todo-list/{todoListId}/todo-list-element")
public class TodoElementResource {
    private final TodoElementService todoElementService;

    public TodoElementResource(TodoElementService todoElementService) {
        this.todoElementService = todoElementService;
    }

    //getting all todo element attached to list
    @GetMapping("/all")
    public ResponseEntity<List<TodoElement>> getTodoElements(@PathVariable("todoListId") Long todoListId) {
        List<TodoElement> todoElements = todoElementService.findTodoElementByTodoList(todoListId);
        return new ResponseEntity<>(todoElements, HttpStatus.OK);
    }

    //adding todo element
    @PostMapping("/add")
    public ResponseEntity<TodoElement> addTodoElement(@RequestBody TodoElement todoElement, @PathVariable("todoListId") Long todoListId) {
        TodoElement newTodoElement = todoElementService.addTodoElement(todoElement, todoListId);
        return new ResponseEntity<>(newTodoElement, HttpStatus.CREATED);
    }

    //updating by id
    @PutMapping("/update/{id}")
    public ResponseEntity<TodoElement> updateTodoElement(@RequestBody TodoElement todoElement, @PathVariable("id") Long id) {
        TodoElement upTodoElement = todoElementService.updateTodoElement(todoElement, id);
        return new ResponseEntity<>(upTodoElement, HttpStatus.OK);
    }

    //changing element's status
    @GetMapping("/change/{id}/{status}")
    public ResponseEntity<TodoElement> changeStatus(@PathVariable("status") String status, @PathVariable("id") Long id) {
        TodoElement newTodoElement = todoElementService.changeStatus(id, status.equals("1") ? Status.DONE:Status.UNDONE);
        return new ResponseEntity<>(newTodoElement, HttpStatus.CREATED);
    }

    //deleting element
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteTodoElement(@PathVariable("id") Long id) {
        todoElementService.deleteTodoElement(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
