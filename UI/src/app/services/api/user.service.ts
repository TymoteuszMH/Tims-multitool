import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/api';
import { LoginDataService } from '../logindata.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  /* 
  @signIn: logging to page
  @signUp: creating user
  @updateUser: updates user by uuid
  @deleteUser: deletes user by uuid
  */
  readonly url = api.url + "user/";

  constructor(private http:HttpClient) { }

  /*
  request takes values username and password, 
  if user exists, api returns user with uuid and id
  else it returns error
  */
  signIn(val:any){
    return this.http.post(this.url + 'login', val);
  }
  /*
  request takes values username and password, 
  if user exists, api returns error
  else user is added
  */
  signUp(val:any){
    return this.http.post(this.url + 'add', val);
  }
  /*
  request can take password or username, missing value will be added on api
  */
  updateUser(val:any){
    return this.http.put(this.url + 'update/' + LoginDataService.loginData.uuid, val);
  }
  /*
  delete user needs uuid for deleting current user
  */
  deleteUser(){
    return this.http.delete(this.url + 'delete/' + LoginDataService.loginData.uuid);
  }
}
