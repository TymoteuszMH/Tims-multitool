import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeService } from 'src/app/services/change.service';
import { LoginDataService } from 'src/app/services/logindata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private changeroute: ChangeService){}

  logged = LoginDataService.logged;
  login = LoginDataService.username;
  logUuid = LoginDataService.uuid;
  //changing data after logout
  logout(){
    LoginDataService.logout();
    this.changeroute.change(false);
  }
}
