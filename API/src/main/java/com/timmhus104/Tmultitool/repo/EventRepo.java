package com.timmhus104.Tmultitool.repo;

import com.timmhus104.Tmultitool.model.Event;
import com.timmhus104.Tmultitool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepo extends JpaRepository<Event, Long> {
    //all speaks for itself
    Optional<Event> findEventById(Long id);
    List<Event> findEventByUser(User user);
    void deleteEventById(Long id);
}