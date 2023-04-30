import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @data: data for form
  @edit: checks if it should be edit form or not
  @login: checks if it should be login form or not
  @userForm: form fields
  */
  @Output() done = new EventEmitter<string>;
  @Input() title:any;
  @Input() uuid = "";
  @Input() data:login = {username: "", password: ""};
  @Input() edit = false;
  @Input() login = false;

  userForm = this.fb.group({
    username: [this.data.username, Validators.required],
    password: [this.data.password, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private user: UserService,
              private spinner: NgxSpinnerService) { }
  /*
  @formSubmit: getting data and checking what form is submitted
  @signIn: sending data to login api, if data is correct, success is send to parent component, data is stored in localStorage, else error is send to parent component
  @signUp: sending data to add user api, if data is correct, success is send to parent component, else error is send to parent component
  @editUser: sending data to edit user api, if data is correct, success is send to parent component, else error is send to parent component
  */
  formSubmit(){
    this.spinner.show();
    var val = {username: this.userForm.value.username,
               password: this.userForm.value.password }
    if(this.login){
      this.signIn(val);
    }
    else if(this.edit){
      this.editUser(val);
    }else{
      this.signUp(val);
    }
  }

  signIn(val: any){
    this.done.emit("");
    this.user.signIn(val).subscribe({
      next: (res:any) => {
        this.done.emit("success");
        LoginDataService.login(res.username, res.password, res.uuid);
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

  editUser(val: any){
    this.user.updateUser(val).subscribe({
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
