import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  /* 
  @getEvents: getting all user's events
  @getEventById: getting specific event by it's id
  @addEvent: adding new event
  @updateEvent: updating existing event by it's id
  @deleteEvent: deleting event by it's id
  */
  readonly uuid = localStorage.getItem('uuid') || sessionStorage.getItem('uuid');
  readonly url = api.url + this.uuid + "/event/";

  constructor(private http:HttpClient) { }
  /*
  gets list of an events
  */
  getEvents():Observable<any[]>{
    return this.http.get<any[]>(this.url + 'all');
  }
  /*
  if id exists api returns event else it returns error
  */
  getEventById(id:any){
    return this.http.get(this.url + 'id/' + id);
  }
  /*
  event gets values for: title, date (YYYY-mm-dd),
  all values are needed
  */
  addEvent(val:any){
    return this.http.post(this.url + 'add', val);
  }
  /*
  update event needs all previous data
  */
  updateEvent(id: any, val:any){
    return this.http.put(this.url + 'update/' + id, val);
  }
  /*
  id of event is needed for deleting it
  */
  deleteEvent(id: any){
    return this.http.delete(this.url + 'delete/' + id);
  }
}
