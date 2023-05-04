import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from 'src/app/services/api/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  /*
  @data: data for edit
  @edit: checks if modal should be add or edit modal
  @id: id of edited event
  @title: title of edited event
  @date: date of edited event
  */
  @Input() data: any;
  @Input() edit: boolean = false;

  id:number = 0;
  title:string = ""
  date:string = new Date().toISOString().substring(0, 10);

  eventForm: any;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private eventService: EventService) {}

  ngOnInit(){
    if(this.data){
      this.id = this.data.id;
      this.title = this.data.title;
      var date = new Date(this.data.date);
      date.setDate(date.getDate() + 1);
      this.date = date.toISOString().substring(0, 10);
    }
    this.eventForm = this.fb.group({
      title: [this.title, Validators.required],
      date: [this.date, Validators.required],
    });
  }

  /*
  @formSubmit: after submitting function check's if it's an edit for or not and sends data to correct api
  @closeModal: closing modal
  */

  formSubmit(){
    this.spinner.show();
    var val = {title: this.eventForm.value.title,
                date: this.eventForm.value.date }
    if(this.edit){
      this.eventService.updateEvent(this.id, val).subscribe(()=>{
        this.closeModal(true)
      })
    }else{
      this.eventService.addEvent(val).subscribe(()=>{
        this.closeModal(true)
      })
    }
  }
  //closing modal and sending response
  closeModal(anwser:boolean) {
    this.activeModal.close(anwser);
  }
}
