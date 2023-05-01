import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(
    public activeModal: NgbActiveModal
  ){}

  //closing modal and sending response
  closeModal(anwser:boolean) {
    this.activeModal.close(anwser);
  }
}