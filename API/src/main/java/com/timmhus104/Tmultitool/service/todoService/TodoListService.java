package com.timmhus104.Tmultitool.service.todoService;

import com.timmhus104.Tmultitool.exception.FileNotFoundException;
import com.timmhus104.Tmultitool.exception.UserNotFoundException;
import com.timmhus104.Tmultitool.model.Todo.TodoList;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.repo.UserRepo;
import com.timmhus104.Tmultitool.repo.todoRepo.TodoListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TodoListService {
    private final TodoListRepo todoListRepo;
    //user repo is for user authentication
    private final UserRepo userRepo;

    @Autowired
    public TodoListService(TodoListRepo todoListRepo, UserRepo userRepo) {
        this.todoListRepo = todoListRepo;
        this.userRepo = userRepo;
    }

    //adding file needs uuid from logged user
    public TodoList addTodoList (TodoList todoList, UUID userUuid){
        User user = getUser(userUuid);
        todoList.setUser(user);
        user.getTodos().add(todoList);
        return todoListRepo.save(todoList);
    }
    //updating todo list, elements of list are from old instance of a list
    public TodoList updateTodoList (TodoList todoList, Long id){
        TodoList oldTodoList = todoListRepo.findTodoListById(id).orElseThrow(() -> new FileNotFoundException("Todo not found"));
        todoList.setId(id);
        todoList.setTodoElement(oldTodoList.getTodoElement());
        return todoListRepo.save(todoList);
    }

    //finding todo list by id
    public TodoList findTodoListById(Long id){
        return todoListRepo.findTodoListById(id).orElseThrow(() -> new FileNotFoundException("Todo not found"));
    }

    //getting all todo lists attached to user
    public List<TodoList> findTodoListByUser(UUID userUuid){
        User user = getUser(userUuid);
        return todoListRepo.findTodoListByUser(user);
    }

    //deleting todolist
    public void deleteTodoList(Long id){
        todoListRepo.deleteTodoListById(id);
    }

    //function to get user by uuid and returning him if exists
    private User getUser(UUID userUuid) {
        User user = userRepo.findByUuid(userUuid);
        Optional<User> owner = userRepo.findById(user.getId());
        if (owner.isPresent()) {
            return owner.get();
        }
        throw new UserNotFoundException("User not found!");
    }
}