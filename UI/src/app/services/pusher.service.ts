import { Injectable } from '@angular/core';
import { beamsClient } from 'src/pusher-keys';
import { LoginDataService } from './logindata.service';

@Injectable({
  providedIn: 'root'
})



export class PusherService {

  constructor() { }

  static registerDevice(){
    if (Notification.permission === 'granted' && LoginDataService.loginData.keep)
      beamsClient.start()
        .then((beamsClient: any) => beamsClient.getDeviceId())
        .then((deviceId: any) => console.log("Successfully registered with Beams. Device ID:", deviceId))
        .then(() => beamsClient.addDeviceInterest(LoginDataService.loginData.uuid || ''))
        .then(() => beamsClient.getDeviceInterests())
        .then((interests: any) => console.log("Current interests:", interests))
        .catch(console.error);
  }

  static deRegisterDevice(){
    if (LoginDataService.loginData.keep)
      beamsClient.removeDeviceInterest(LoginDataService.loginData.uuid || '')
        .then(() => beamsClient.stop())
        .then(() => console.log("Successfully deregistred with Beams."))
        .then((interests: any) => console.log("Current interests:", interests))
        .catch(console.error);
  }

}
