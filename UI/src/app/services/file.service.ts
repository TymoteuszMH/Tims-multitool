import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { api } from 'src/api';

@Injectable({
  providedIn: 'root'
})

export class FileService {
  /* 
  @getFilesByType: getting all users files sorted by types: note, todo or calendar event
  @getFileById: getting specific file by it's id
  @addFile: adding new file
  @updateFile: updating existing file by it's id
  @deleteFile: deleting file by it's id
  */
  readonly uuid = localStorage.getItem('uuid')
  readonly url = api.url + this.uuid + "/user/";

  constructor(private http:HttpClient) { }
  /*
  types are: "todo", "note", "event"
  */
  getFilesByType(type:string):Observable<any[]>{
    return this.http.get<any[]>(this.url + 'type/' + type);
  }
  /*
  if id exists api returns data else it returns error
  */
  getFileById(id:any){
    return this.http.get(this.url + 'id/' + id);
  }
  /*
  each type gets values for: title, content,
  date is not needed but is nesessary for notifications
  */
  addFile(val:any){
    return this.http.post(this.url + 'add', val);
  }
  /*
  update file needs all previous data
  */
  updateFile(id: any, val:any){
    return this.http.post(this.url + 'update/' + id, val);
  }
  /*
  id of file is needed for deleting it
  */
  deleteFile(id: any){
    return this.http.delete(this.url + 'delete/' + id);
  }
}
