import { Component, ChangeDetectionStrategy, DoCheck, OnInit } from '@angular/core';
import { startOfDay, isSameDay,  isSameMonth } from 'date-fns';
import { Observable, Subject} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarMonthViewBeforeRenderEvent,  CalendarView,} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { EventService } from 'src/app/services/api/event.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventFormComponent } from 'src/app/modals/event-form/event-form.component';
import { ConfirmComponent } from 'src/app/modals/confirm/confirm.component';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/api/todo.service';
import { TodoListComponent } from 'src/app/modals/todo-list/todo-list.component';

const colors: Record<string, EventColor> = {
  event: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  todo: {
    primary: 'blue',
    secondary: 'lightblue',
  },
};


@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit{

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="bi bi-pen"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openModal(event);
      },
    },
    {
      label: '<i class="bi bi-calendar-x"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }) => {
        this.openDeleteModal(event)
      },
    },
  ];

  refresh = new Subject<void>();

  CalEvents: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private eventService: EventService, 
              private todoService: TodoService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal) {}

  ngOnInit(){
    this.spinner.show();
    this.CalEvents = [];
    this.getEvents();
    this.getTodos();
  }

  getEvents(){
    this.eventService.getEvents().subscribe((res)=>{
      res.forEach((el:any)=>{
        this.CalEvents.push({start: startOfDay(new Date(el.date)),
                              id: el.id,
                              title: el.title,
                              color: colors['event'],
                              actions: this.actions})
      })
      this.refresh.next();
      this.spinner.hide();
    });
  }

  getTodos(){
    this.todoService.getTodoLists().subscribe((res)=>{
      res.forEach((el:any)=>{
        if(el.date){
          this.CalEvents.push({start: startOfDay(new Date(el.date)),
                                id: el.id,
                                title: el.title,
                                color: colors['todo'],
                                actions: this.actions})
        }
      })
      this.refresh.next();
      this.spinner.hide();
    });
  }

  openModal(data:any){
    if(data.color == colors['todo']){
      this.editTodo(data);
    }else{
      this.editEvent(data);
    }
  }

  openDeleteModal(data:any){
    if(data.color == colors['todo']){
      this.deleteTodo(data.id);
    }else if ((data.color == colors['event'])){
      this.deleteEvent(data.id);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }){
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent){
    this.CalEvents = this.CalEvents.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  setView(view: CalendarView){
    this.view = view;
  }

  closeOpenMonthViewDay(){
    this.activeDayIsOpen = false;
  }

  addEvent(){
    const modalRef = this.modalService.open(EventFormComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.ngOnInit();
      }
    });
  }

  editEvent(data:any){

    var val = {id: data.id,
      title: data.title,
      date: data.start}
    const modalRef = this.modalService.open(EventFormComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.componentInstance.data = val;
    modalRef.componentInstance.edit = true;
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.ngOnInit();
      }
    });
  }
  editTodo(data:any){
    var val = {id: data.id,
      title: data.title,
      date: data.start.setDate(data.start.getDate() + 1)}
    const modalRef = this.modalService.open(TodoListComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.componentInstance.data = val;
    modalRef.result.then(()=>{
      this.spinner.show();
      this.ngOnInit();
    });
  }

  deleteEvent(id: any){
    const modalRef = this.modalService.open(ConfirmComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.eventService.deleteEvent(id).subscribe(()=>{
          this.ngOnInit();
        }); 
      }
    });
  }
  
  deleteTodo(id: any){
    const modalRef = this.modalService.open(ConfirmComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.todoService.deleteTodoList(id).subscribe(()=>{
          this.ngOnInit();
        }); 
      }
    });
  }
}