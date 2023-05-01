import { Component } from '@angular/core';
import { FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { login } from 'src/app/interfaces/login';
import { ConfirmComponent } from 'src/app/modals/confirm/confirm.component';
import { PassChangeComponent } from 'src/app/modals/pass-change/pass-change.component';
import { UserService } from 'src/app/services/api/user.service';
import { ChangeService } from 'src/app/services/change.service';
import { LoginDataService } from 'src/app/services/logindata.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  /*
  @data: takes username of logged user and empty password for forms
  @usn_error: shows error if username is occupied
  @usernem: username field for username form
  @password: password field for password form
  */
  data:login = {username: LoginDataService.username, password: ""};
  usn_error:boolean = false;

  username = this.fb.group({
    username: [this.data.username, Validators.required],
  });

  password = this.fb.group({
    password: [this.data.password, [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder,
              private user: UserService,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private changeroute: ChangeService){}
  
  /*
  @editUsername: open modal to check password of an user, then after modal is closed sending username to change and logging user out, if username exists then error shows
  @editPassword: open modal to check password of an user, then after modal is closed sending password to change and logging user out
  @deleteUser: open confirm modal to ask user if he's sure, after submitting deleting user and logging out
  */
  editUsername(){
    this.usn_error = false;
    var val = {username: this.username.value.username}
    const modalRef = this.modalService.open(PassChangeComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.user.updateUser(val).subscribe({
          next: () => {
            LoginDataService.logout();
            this.changeroute.change(false);
            this.spinner.hide();
          },
          error: () => {
            this.usn_error = true;
            this.spinner.hide();
          }
        });
      }else{
        
      }
    });
  }

  editPassword(){
    var val = {password: this.password.value.password }
    const modalRef = this.modalService.open(PassChangeComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.user.updateUser(val).subscribe({
          next: () => {
            LoginDataService.logout();
            this.changeroute.change(false);
            this.spinner.hide();
          },
          error: () => {
            this.spinner.hide();
          }
        });
      }
    });
  }

  deleteUser(){
    const modalRef = this.modalService.open(ConfirmComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.user.deleteUser().subscribe({
          next: () => {
            LoginDataService.logout();
            this.changeroute.change(false);
            this.spinner.hide();
          },
          error: () => {
            this.spinner.hide();
          }
        });
      }
    });
  }
}
