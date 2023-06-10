import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';

export interface ILoginData{
  keep?: boolean;
  logged: boolean | null;
  uuid: string | null;
  username: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class LoginDataService {
  static loginData: ILoginData;

  static check(){
    LoginDataService.loginData = localStorage.getItem('localData') ?
    JSON.parse(localStorage.getItem('localData') || '')
    : 
    sessionStorage.getItem('localData') ?
    JSON.parse(sessionStorage.getItem('localData') || '')
    :
    {keep: false,logged: false,uuid: '',username: ''};
  }

  static login(username:string, uuid:string, keep:boolean){
    var loginData:ILoginData = {
      keep: keep ? true : undefined,
      logged: true,
      username: username,
      uuid: uuid,
    }
    
    if(keep)
      localStorage.setItem('localData', JSON.stringify(loginData))
    else
      sessionStorage.setItem('localData', JSON.stringify(loginData))
    LoginDataService.check();
    PusherService.registerDevice();
  }
  static logout(){
    PusherService.deRegisterDevice();
    localStorage.clear();
    sessionStorage.clear();
    LoginDataService.check();
  }
}
