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
  data:login = {username: LoginDataService.username, password: ""};
  usn_error:boolean = false;
  pass_error:boolean = false;

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
              private changeroute: ChangeService) { }
  
  editUsername(){
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
            this.pass_error = true;
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
