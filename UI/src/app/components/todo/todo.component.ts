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
  @todos: get list of todos as todoLi from interface
  @todosWithoutFilters: stores todos array
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
  @getTodos: getting user's todos
  @filter: filtring through todos to find title
  @showModal: showing todos edit modal
  @addTodo: adding todo and showing it's modal
  @deleteTodo: showing confirm modal, deleting todo after submitting
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
    modalRef.result
    .then(()=>{
      this.getTodos();
    })
    .catch(()=>{
      this.getTodos();
    })
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
    modalRef.result
    .then((res:boolean)=>{
      if(res){
        this.todoService.deleteTodoList(id).subscribe(()=>{
          this.getTodos();
        });
      }
    })
    .catch(()=>{
      this.getTodos();
    })
  }
}