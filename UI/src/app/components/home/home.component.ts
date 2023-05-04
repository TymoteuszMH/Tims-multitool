import { Component } from '@angular/core';
import { LoginDataService } from 'src/app/services/logindata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //username
  login = ""
  //check current username
  ngDoCheck(){
    this.login = LoginDataService.username;
  }
}
