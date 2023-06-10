import { Component } from '@angular/core';
import { LoginDataService } from 'src/app/services/logindata.service';
import { PusherService } from 'src/app/services/pusher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //username
  login = ""
  //checks if user asked for permision
  askedForNot:boolean = false;
  info: boolean = false;
  //check current username

  //checking if user granted permission for notifications
  ngDoCheck(){
    this.login = LoginDataService.loginData.username || '';
    if (Notification.permission === 'granted') {
      this.askedForNot = true;
    }else if (Notification.permission === 'denied'){
      this.askedForNot = true;
      this.info = true;
    }
  }
  //check for notification premission
  requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(() => {
          PusherService.registerDevice();
      });
    }
  }
}
