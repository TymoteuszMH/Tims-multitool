package com.timmhus104.Tmultitool.repo.todoRepo;

import com.timmhus104.Tmultitool.model.Todo.TodoElement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoElementRepo extends JpaRepository<TodoElement, Long> {
    //there is no need to find element by id
    List<TodoElement> findTodoElementByTodoList(Long todoId);
    void deleteTodoElementById(Long id);
}