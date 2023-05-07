import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { status, todoEl } from 'src/app/interfaces/todo-element';
import { TodoService } from 'src/app/services/api/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  /*
  @data: data of selected list
  @id: id of selected list
  @title: title of selected list
  @date: date of selected list
  @todoForm: form for todo list
  @todoElements: todoElements of selected list
  */

  @Input() data: any;
  id: number = 0;
  title: string = "";
  date: string = "";
  todoForm: any;
  todoElements: todoEl[] = [];

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private todoService: TodoService) {}

  ngOnInit(){
    this.spinner.show();
    this.id = this.data.id;
    this.title = this.data.title;
    if(this.data.date){
      this.date = new Date(this.data.date).toISOString().substring(0, 10);
    }else{
      this.date = ""
    }
    this.todoForm = this.fb.group({
      title: [this.title, Validators.required],
      date: [this.date, Validators.required],
    });
    this.getTodo()
  }

  /*
  @getTodo: getting todoelements
  @addTodoEl: adding new element to list
  @saveLi: saving list changes after change
  @seveEl: saving element of list after change
  @done: changing element's status
  @deleteEl: delete element
  @closeModal: closing modal
  */

  getTodo(){
    this.todoService.getTodoElements(this.id).subscribe((res:any)=>{
      this.todoElements = res;
      this.spinner.hide();
    })
  }

  addTodoEl(){
    var val = {content: ""}
    this.todoService.addTodoElement(this.id, val).subscribe(()=>{
      this.getTodo();
    })
  }

  saveLi(){
    var val = {title: this.todoForm.value.title, date: this.todoForm.value.date }
    this.todoService.updateTodoList(this.id, val).subscribe(()=>{this.getTodo();});
  }

  saveEl(id: number, content:string, status:status){
    var val = {id: id,
                content: content,
                status: status
    }
    this.todoService.updateTodoElement(this.id, id, val).subscribe(()=>{
      this.getTodo();
    });
  }

  done(event:any, id: number, content:string){
    var stat = status.UNDONE;
    if(event.target.checked){
      stat = status.DONE;
    }else{
      stat = status.UNDONE;
    }
    this.saveEl(id, content, stat)
  }

  deleteEl(id: number){
    this.todoService.deleteTodoElement(this.id, id).subscribe(()=>{
      this.getTodo();
    });
  }

  //closing modal and sending response
  closeModal(anwser:boolean) {
    this.activeModal.close(anwser);
  }
}
