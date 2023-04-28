import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  static logged:any;
  static uuid:any;
  static username: any;
  static password: any;


  static check(){
    LoginDataService.logged = localStorage.getItem('logged');
    LoginDataService.uuid = localStorage.getItem('uuid');
    LoginDataService.username = localStorage.getItem('username');
    LoginDataService.password = localStorage.getItem('password');
  }
  static login(username:string, password:string, uuid:string){
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('uuid', uuid);
    localStorage.setItem('logged', '1');
    LoginDataService.check();
  }
  static logout(){
    localStorage.setItem('username','');
    localStorage.setItem('password','');
    localStorage.setItem('uuid','0');
    localStorage.setItem('logged','0');
    LoginDataService.check();
  }
}
