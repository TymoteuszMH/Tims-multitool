package com.timmhus104.Tmultitool.service;

import com.timmhus104.Tmultitool.exception.FileNotFoundException;
import com.timmhus104.Tmultitool.exception.UserNotFoundException;
import com.timmhus104.Tmultitool.model.Event;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.repo.EventRepo;
import com.timmhus104.Tmultitool.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService{
    private final EventRepo eventRepo;
    //user repo is for user authentication
    private final UserRepo userRepo;

    @Autowired
    public EventService(EventRepo eventRepo, UserRepo userRepo) {
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
    }

    //adding event needs uuid from logged user
    public Event addEvent (Event event, UUID userUuid){
        User user = getUser(userUuid);
        event.setUser(user);
        user.getEvents().add(event);
        return eventRepo.save(event);
    }
    //update event doesn't need all null checks 'cause all the data will be passed anyway
    public Event updateEvent (Event event, Long id){
        event.setId(id);
        return eventRepo.save(event);
    }

    //finding file by id
    public Event findEventById(Long id){
        return eventRepo.findEventById(id).orElseThrow(() -> new FileNotFoundException("File not found"));
    }
    //getting all files by type attached to user
    public List<Event> findEventByUser(UUID userUuid){
        User user = getUser(userUuid);
        return eventRepo.findEventByUser(user);
    }

    public List<Event> findEventByUserAndDate(UUID userUuid){
        User user = getUser(userUuid);
        LocalDate today = LocalDate.now();
        return eventRepo.findEventByUserAndDate(user, today).orElseThrow(() -> new FileNotFoundException("There is no events today"));
    }
    public void deleteEvent(Long id){
        eventRepo.deleteEventById(id);
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