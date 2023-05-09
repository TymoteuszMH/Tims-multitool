package com.timmhus104.Tmultitool;

import com.timmhus104.Tmultitool.model.Event;
import com.timmhus104.Tmultitool.service.EventService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "https://tims-multitool.vercel.app")
@RestController
@RequestMapping("/{userUuid}/event")
public class EventResource {
    private final EventService eventService;

    public EventResource(EventService eventService) {
        this.eventService = eventService;
    }

    //getting all events attached to user
    @GetMapping("/all")
    public ResponseEntity<List<Event>> getEvent(@PathVariable("userUuid") UUID userUuid) {
        List<Event> event = eventService.findEventByUser(userUuid);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @GetMapping("/today")
    public ResponseEntity<List<Event>> getEventToday(@PathVariable("userUuid") UUID userUuid) {
        List<Event> event = eventService.findEventByUserAndDate(userUuid);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    //id is for showing details
    @GetMapping("/id/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable("id") Long id) {
        Event event = eventService.findEventById(id);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    //adding event
    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody Event event, @PathVariable("userUuid") UUID userUuid) {
        Event newEvent = eventService.addEvent(event, userUuid);
        return new ResponseEntity<>(newEvent, HttpStatus.CREATED);
    }

    //updating event by id
    @PutMapping("/update/{id}")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event, @PathVariable("id") Long id) {
        Event upEvent = eventService.updateEvent(event, id);
        return new ResponseEntity<>(upEvent, HttpStatus.OK);
    }

    //deleting event
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteEvent(@PathVariable("id") Long id) {
        eventService.deleteEvent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}