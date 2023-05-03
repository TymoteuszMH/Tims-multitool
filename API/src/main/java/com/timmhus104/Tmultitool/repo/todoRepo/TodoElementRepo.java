package com.timmhus104.Tmultitool.repo.todoRepo;

import com.timmhus104.Tmultitool.model.Todo.TodoElement;
import com.timmhus104.Tmultitool.model.Todo.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoElementRepo extends JpaRepository<TodoElement, Long> {
    //there is no need to find element by id
    List<TodoElement> findTodoElementByTodoList(TodoList todoList);
    void deleteTodoElementById(Long id);
}