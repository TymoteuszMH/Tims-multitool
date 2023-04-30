package com.timmhus104.Tmultitool.service.todoService;

import com.timmhus104.Tmultitool.enumeration.Status;
import com.timmhus104.Tmultitool.exception.FileNotFoundException;
import com.timmhus104.Tmultitool.model.Todo.TodoElement;
import com.timmhus104.Tmultitool.model.Todo.TodoList;
import com.timmhus104.Tmultitool.repo.todoRepo.TodoElementRepo;
import com.timmhus104.Tmultitool.repo.todoRepo.TodoListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoElementService {
    private final TodoElementRepo todoElementRepo;
    private final TodoListRepo todoListRepo;

    @Autowired
    public TodoElementService(TodoElementRepo todoElementRepo, TodoListRepo todoListRepo) {
        this.todoElementRepo = todoElementRepo;
        this.todoListRepo = todoListRepo;
    }

    //adding todo elements needs todo list id to add element to list
    public TodoElement addTodoElement (TodoElement todoElement, Long todoListId){
        TodoList todoList = todoListRepo.findTodoListById(todoListId).orElseThrow(() -> new FileNotFoundException("File not found"));
        todoElement.setTodoList(todoList);
        todoElement.setStatus(Status.UNDONE);
        todoList.getTodoElement().add(todoElement);
        return todoElementRepo.save(todoElement);
    }
    //in todo element you can only update title
    public TodoElement updateTodoElement (TodoElement todoElement, Long id){
        todoElement.setId(id);
        return todoElementRepo.save(todoElement);
    }

    //changing status of an element
    public TodoElement changeStatus (Long id, Status status){
        TodoElement todoElement = todoElementRepo.getReferenceById(id);
        todoElement.setStatus(status);
        return todoElementRepo.save(todoElement);
    }

    //getting all elements by type attached to list
    public List<TodoElement> findTodoElementByTodoList(Long todoListId){
        TodoList todoList = todoListRepo.findTodoListById(todoListId).orElseThrow(() -> new FileNotFoundException("File not found"));
        return todoElementRepo.findTodoElementByTodoList(todoList.getId());
    }

    //deleting todo element
    public void deleteTodoElement(Long id){
        todoElementRepo.deleteTodoElementById(id);
    }
}