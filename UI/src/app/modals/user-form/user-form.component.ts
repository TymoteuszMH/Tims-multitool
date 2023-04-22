import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { login } from 'src/app/interfaces/login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Output() done = new EventEmitter<string>;
  @Output() mess = new EventEmitter<string>;
  @Input() title:any;
  @Input() uuid = "";
  @Input() editType = "";
  @Input() data:login = {username: "", password: ""};
  @Input() edit = false;
  @Input() login = false;

  userForm = this.fb.group({
    username: [this.data.username, Validators.required],
    password: [this.data.password, Validators.required],
  });

  constructor(private fb: FormBuilder,
              private user: UserService,
              private spinnerService: Ng4LoadingSpinnerService) { }

  formSubmit(){
    var uuid = this.uuid;
    var val = {username: this.userForm.value.username,
               password: this.userForm.value.password }
    if(this.login){
      this.SignIn(val);
    }
    else if(this.edit){
      this.editUser(val, uuid);
    }else{
      this.SignUp(val);
    }
  }

  SignIn(val: any){
    this.done.emit("");
    this.user.signIn(val).subscribe({
      next: (res:any) => {
        this.done.emit("success");
        localStorage.setItem('username', res.username);
        localStorage.setItem('uuid', res.uuid);
        localStorage.setItem('password', res.password);
      },
      error: () => {
        this.done.emit("error");
      }
    });
  }

  SignUp(val: any){
    this.user.signUp(val).subscribe({
      next: () => {
        this.done.emit("success");
      },
      error: () => {
        this.done.emit("error");
      }
    });
  }

  editUser(val: any, uuid:string){
    this.user.updateUser(val, uuid).subscribe({
      next: () => {
        this.done.emit("success");
      },
      error: () => {
        this.done.emit("error");
      }
    });
  }

}
