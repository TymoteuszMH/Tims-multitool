import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/modals/confirm/confirm.component';
import { ChangeService } from 'src/app/services/change.service';
import { LoginDataService } from 'src/app/services/logindata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private changeroute: ChangeService, 
              private modalService: NgbModal){}

  logged = LoginDataService.logged;
  login = LoginDataService.username;
  logUuid = LoginDataService.uuid;
  //changing data after logout
  logout(){
    const modalRef = this.modalService.open(ConfirmComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then(()=>{
      LoginDataService.logout();
      this.changeroute.change(false);
    });

  }
}
