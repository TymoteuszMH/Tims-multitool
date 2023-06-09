import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.css']
})
export class PassChangeComponent {
  /*
  @error: showing error if password is incorect
  */
  error = false;

  constructor(public activeModal: NgbActiveModal){}

  /*
  @getStatus: checking if password is correct
  @closeModal: closing modal
  */

  getStatus(res:string){
    this.error = false;
    if(res == 'success'){
      this.closeModal(true);
    }
    else if(res == 'error'){
      this.error = true;
    }
  }
  
  closeModal(anwser:boolean) {
    this.activeModal.close(anwser);
  }
}
