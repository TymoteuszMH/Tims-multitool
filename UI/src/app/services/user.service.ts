import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = api.url + "user/";

  constructor(private http:HttpClient) { }

  signIn(val:any){
    console.log(val)
    return this.http.post(this.url + 'login', val);
  }

  signUp(val:any){
    return this.http.post(this.url + 'add', val);
  }

  updateUser(uuid: any,val:any){
    return this.http.post(this.url + 'update/' + uuid, val);
  }

  deleteUser(uuid: any){
    return this.http.delete(this.url + 'delete/' + uuid);
  }
}
