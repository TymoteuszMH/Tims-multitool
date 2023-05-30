import { Injectable } from '@angular/core';
import { beamsClient } from 'src/pusher-keys';

@Injectable({
  providedIn: 'root'
})



export class PusherService {

  constructor() { }

  static registerDevice(){
    if (Notification.permission === 'granted') {
      beamsClient.start()
        .then((beamsClient: any) => beamsClient.getDeviceId())
        .then((deviceId: any) =>
          console.log("Successfully registered with Beams. Device ID:", deviceId)
        )
        .then(() => beamsClient.addDeviceInterest(localStorage.getItem('uuid') || 'null'))
        .then(() => beamsClient.getDeviceInterests())
        .then((interests: any) => console.log("Current interests:", interests))
        .catch(console.error);
    }
  }

  static deRegisterDevice(){
    beamsClient.stop();
  }

}
