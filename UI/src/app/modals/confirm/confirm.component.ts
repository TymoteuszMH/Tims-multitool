import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  @Output() done = new EventEmitter<boolean>;

  constructor(
    public activeModal: NgbActiveModal
  ){}

  emitAnwser(){
    this.activeModal.close();
  }
  //closing modal
  closeModal() {
    this.activeModal.dismiss();
  }
}