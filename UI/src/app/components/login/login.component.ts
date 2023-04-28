import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeService } from 'src/app/services/change.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /*
  @error: showing error message
  @success: showing success message
  @signn: checks which form should be displayed
  */
  error = false;
  success = false
  signin = true;

  constructor(private changeroute: ChangeService){}

  /*
  @changeForm: changing form to sign in or sign up
  @getStatus: checking if user exists if not showing success messange or logging in, else showing error messange
  */
  changeForm(change:boolean) {
    this.error=false;
    this.success = false;
    if(change){
      this.signin=false;
    }else{
      this.signin=true;
    }
  }
  getStatus(res:string){
    this.error = false;
    this.success = false;
    if(res == 'success'){
      if(this.signin){
        this.changeroute.change(true);
      }else{
        this.signin = true;
        this.success = true;
      }
    }
    else if(res == 'error'){
      this.error = true;
    }
  }
}
