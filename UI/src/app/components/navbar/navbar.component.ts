import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/modals/confirm/confirm.component';
import { ChangeService } from 'src/app/services/change.service';
import { ILoginData, LoginDataService } from 'src/app/services/logindata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private changeroute: ChangeService, 
              private modalService: NgbModal){}
  /*
  @logged: getting if user is logged
  @login: getting username
  @logUuid: getting getting logUuid
  */
  loginData: ILoginData = LoginDataService.loginData;;
  /*
  @logout: showing confirm modal, logging out after submitting
  */
  ngDoCheck(){
    this.loginData = LoginDataService.loginData;
  }

  logout(){
    const modalRef = this.modalService.open(ConfirmComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        LoginDataService.logout();
        this.changeroute.change(false);
      }
    });
  }
}
