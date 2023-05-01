import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/api';
import { LoginDataService } from '../logindata.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  /* 
  @getNotes: getting all user's notes
  @getNoteById: getting specific note by it's id
  @addNote: adding new note
  @updateNote: updating existing note by it's id
  @deleteNote: deleting note by it's id
  */
  readonly url: string;

  constructor(private http:HttpClient) {
    this.url = api.url + LoginDataService.uuid + "/note/";}
  /*
  gets list of an notes
  */
  getNotes():Observable<any[]>{
    return this.http.get<any[]>(this.url + 'all');
  }
  /*
  if id exists api returns note else it returns error
  */
  getNoteById(id:any){
    return this.http.get(this.url + 'id/' + id);
  }
  /*
  note gets values for: title, content
  all values are needed
  */
  addNote(val:any){
    return this.http.post(this.url + 'add', val);
  }
  /*
  update Note needs all previous data
  */
  updateNote(id: any, val:any){
    return this.http.put(this.url + 'update/' + id, val);
  }
  /*
  id of Note is needed for deleting it
  */
  deleteNote(id: any){
    return this.http.delete(this.url + 'delete/' + id);
  }
}
