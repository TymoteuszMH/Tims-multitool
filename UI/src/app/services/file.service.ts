import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { api } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly uuid = localStorage.getItem('uuid')
  readonly url = api.url + this.uuid + "/user/";

  constructor(private http:HttpClient) { }

  getFilesByType(type:string):Observable<any[]>{
     return this.http.get<any[]>(this.url + 'type/' + type);
  }

  getFilesById(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.url + 'id/' + id);
 }

 addFile(val:any){
    return this.http.post(this.url + 'add', val);
 }

  updateFile(id: any, val:any){
    return this.http.post(this.url + 'update/' + id, val);
  }

  deleteFile(id: any){
    return this.http.delete(this.url + 'delete/' + id);
  }
}
