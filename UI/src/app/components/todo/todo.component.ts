import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { todoLi } from 'src/app/interfaces/todo-list';
import { ConfirmComponent } from 'src/app/modals/confirm/confirm.component';
import { TodoListComponent } from 'src/app/modals/todo-list/todo-list.component';
import { TodoService } from 'src/app/services/api/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  /*
  @notes: get list of notes as note from interface
  @notesWithoutFilters: stores notes array
  @titleFilter: filter title
  */
  todos:todoLi[] = [];
  todosWithoutFilters:todoLi[] = [];
  titleFilter:string = "";

  constructor(private modalService: NgbModal,
              private todoService: TodoService,
              private spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.getTodos();
  }

  /*
  @getNotes: getting user's notes
  @filter: filtring through notes to find title
  @goToDetails: going to note details
  @addNote: adding note and going to it
  @deleteNote: showing confirm modal, deletign note after submitting
  */

  getTodos(){
    this.spinner.show();
    this.todoService.getTodoLists().subscribe((res:any)=>{
      this.todos = res;
      this.todosWithoutFilters = res;
      this.spinner.hide();
    })
  }

  filter(){
    var titleFilter = this.titleFilter;

    this.todos = this.todosWithoutFilters.filter(function (el){
      return el.title.toString().toLowerCase().includes(
        titleFilter.toString().trim().toLowerCase()
      )
    })
  }

  showModal(data:any){
    var val = {id: data.id,
               title: data.title,
               date: data.date}
    const modalRef = this.modalService.open(TodoListComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.componentInstance.data = val;
    modalRef.result.then((res:boolean)=>{
      this.spinner.show();
      this.getTodos();
    });
  }

  addTodo(){
    var val = {title:'',
               content: ''
              }
    this.todoService.addTodoList(val).subscribe((res:any)=>{
      this.showModal(res);
    })
  }

  deleteTodo(id:number){
    const modalRef = this.modalService.open(ConfirmComponent,
      {
        scrollable: false,
        centered: true,
        keyboard: false,
      });
    modalRef.result.then((res:boolean)=>{
      if(res){
        this.spinner.show();
        this.todoService.deleteTodoList(id).subscribe(()=>{
          this.getTodos();
          this.spinner.hide();
        });
      }
    });
  }
}