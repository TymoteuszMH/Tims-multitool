package com.timmhus104.Tmultitool.repo.todoRepo;

import com.timmhus104.Tmultitool.model.Todo.TodoList;
import com.timmhus104.Tmultitool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TodoListRepo extends JpaRepository<TodoList, Long> {
    //all speaks for itself
    Optional<TodoList> findTodoListById(Long id);
    List<TodoList> findTodoListByUser(User user);
    Optional<List<TodoList>> findTodoListByUserAndDate(User user, LocalDate date);
    void deleteTodoListById(Long id);
}