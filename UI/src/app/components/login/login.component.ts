import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = false;
  success = false
  signin = true;

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
        localStorage.setItem('logged', '1');
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
