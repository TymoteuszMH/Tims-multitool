import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { login } from 'src/app/interfaces/login';
import { LoginDataService } from 'src/app/services/logindata.service';
import { UserService } from 'src/app/services/api/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  /*
  @done: sending status to parent login site
  @uuid: uuid for changing users data
  @login: checks if it should be login form or not
  @pass_checkL check if form should display username field
  @keepLogged: boolean for checking if user want to keep login data or not
  @pass_error: showing error if password is shorter than 8 chars
  @userForm: form fields
  */
  
  @Output() done = new EventEmitter<string>;
  @Input() title:any;
  @Input() uuid = "";
  @Input() login = false;
  @Input() pass_check = false;
  keepLogged:boolean = false;
  pass_error:boolean = false;

  userForm = this.fb.group({
    username: [LoginDataService.username, Validators.required],
    password: ["", Validators.required],
  });

  constructor(private fb: FormBuilder,
              private user: UserService,
              private spinner: NgxSpinnerService) { }

  /*
  @keep: checking if user want to have his data stored on device
  @formSubmit: getting data and checking what form is submitted
  @signIn: sending data to login api, if data is correct, success is send to parent component, data is stored in localStorage, else error is send to parent component
  @signUp: sending data to add user api, if data is correct, success is send to parent component, else error is send to parent component
  */

  keep(event:any){
    this.keepLogged = event.target.checked;
  }

  formSubmit(){
    this.spinner.show();
    var val = {username: this.userForm.value.username,
               password: this.userForm.value.password }
    if(val.password?.length != null && val.password.length < 8 && !this.login){
      this.pass_error = true;
      this.spinner.hide();
      return false;}
    if(this.login){
      this.signIn(val);
    }else{
      this.signUp(val);
    }
    return true;
  }

  signIn(val: any){
    this.done.emit("");
    this.user.signIn(val).subscribe({
      next: (res:any) => {
        this.done.emit("success");
        LoginDataService.login(res.username, res.uuid, this.keepLogged);
        this.spinner.hide();
      },
      error: () => {
        this.done.emit("error");
        this.spinner.hide();
      }
    });
  }

  signUp(val: any){
    this.user.signUp(val).subscribe({
      next: () => {
        this.done.emit("success");
        this.spinner.hide();
      },
      error: () => {
        this.done.emit("error");
        this.spinner.hide();
      }
    });
  }
}
