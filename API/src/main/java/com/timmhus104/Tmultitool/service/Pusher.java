package com.timmhus104.Tmultitool.service;

import com.pusher.pushnotifications.PushNotifications;
import com.timmhus104.Tmultitool.model.Event;
import com.timmhus104.Tmultitool.model.Todo.TodoList;
import com.timmhus104.Tmultitool.model.User;
import com.timmhus104.Tmultitool.repo.EventRepo;
import com.timmhus104.Tmultitool.repo.UserRepo;
import com.timmhus104.Tmultitool.repo.todoRepo.TodoListRepo;

import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.*;

public class Pusher {
    private final String instanceId = "2111c416-a6c8-4d12-8036-7dc4e6f2d00c";
    private final String secretKey = "EE3433B5D84E4D8F3F99A26F1FF395D88D9066158CF010DD8E429156DDA0FD89";
    private final PushNotifications beamsClient = new PushNotifications(instanceId, secretKey);
    private final UserRepo userRepo;
    private final EventRepo eventRepo;
    private final TodoListRepo todoListRepo;
    public Pusher(UserRepo userRepo, EventRepo eventRepo, TodoListRepo todoListRepo) {
        this.userRepo = userRepo;
        this.eventRepo = eventRepo;
        this.todoListRepo = todoListRepo;
    }

    public void sendNotification() throws IOException, URISyntaxException, InterruptedException {
        LocalDate today = LocalDate.now();

        List<String> users = getUsers(today);

        Map<String, Map> publishRequest = new HashMap<>();
        Map<String, String> webNotification = new HashMap<>();
        webNotification.put("title", "Hello!");
        webNotification.put("body", "You have something planed today!");
        Map<String, Map> web = new HashMap<>();
        web.put("notification", webNotification);
        publishRequest.put("web", web);
        beamsClient.publishToUsers(users, publishRequest);
    }

    private List<String> getUsers(LocalDate date) {
        List<String> uuids = new ArrayList<>();

        List<User> users = this.userRepo.findAll();

        users.forEach(user -> {
            List<Event> events = eventRepo.findEventByUser(user);
            events.forEach(event -> {
                if(event.getDate() == date)
                    if(!uuids.contains(user.getUuid().toString()))
                        uuids.add(user.getUuid().toString());
            });
            List<TodoList> todoLists = todoListRepo.findTodoListByUser(user);
            todoLists.forEach(todoList -> {
                if(todoList.getDate() == date)
                    if(!uuids.contains(user.getUuid().toString()))
                        uuids.add(user.getUuid().toString());
            });
        });

        return uuids;
    }
}
