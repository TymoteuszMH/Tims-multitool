import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  static logged:any;
  static uuid:any;
  static username: any;
  static password: any;


  static check(){
    LoginDataService.logged = localStorage.getItem('logged') || sessionStorage.getItem('logged');
    LoginDataService.uuid = localStorage.getItem('uuid') || sessionStorage.getItem('uuid');
    LoginDataService.username = localStorage.getItem('username') || sessionStorage.getItem('username');
    LoginDataService.password = localStorage.getItem('password') || sessionStorage.getItem('password');
  }
  static login(username:string, uuid:string, keep:boolean){
    if(keep){
      localStorage.setItem('username', username);
      localStorage.setItem('uuid', uuid);
      localStorage.setItem('logged', '1');
      LoginDataService.check();
    }else{
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('uuid', uuid);
      sessionStorage.setItem('logged', '1');
      LoginDataService.check();
    }

  }
  static logout(){
    localStorage.setItem('username','');
    localStorage.setItem('uuid','0');
    localStorage.setItem('logged','0');
    sessionStorage.setItem('username','');
    sessionStorage.setItem('uuid','0');
    sessionStorage.setItem('logged','0');
    LoginDataService.check();
  }
}
