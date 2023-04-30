import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
/* 
  @getTodoLists: getting all user's todo lists
  @getTodoListById: getting specific list by it's id
  @addTodoList: adding new list
  @updateTodoList: updating existing todo list by it's id
  @deleteTodoList: deleting todo list by it's id
  */
  readonly uuid = localStorage.getItem('uuid') || sessionStorage.getItem('uuid');
  readonly url = api.url + this.uuid + "/todoList/";

  constructor(private http:HttpClient) { }
  /*
  gets list of a todo lists
  */
  getTodoLists():Observable<any[]>{
    return this.http.get<any[]>(this.url + 'all');
  }
  /*
  if id exists api returns todo list else it returns error
  */
  getTodoListById(id:any){
    return this.http.get(this.url + 'id/' + id);
  }
  /*
  todo list gets values for: title, date (YYYY-mm-dd),
  title is needed
  */
  addTodoList(val:any){
    return this.http.post(this.url + 'add', val);
  }
  /*
  update todo list needs all previous data
  */
  updateTodoList(id: any, val:any){
    return this.http.put(this.url + 'update/' + id, val);
  }
  /*
  id of todo list is needed for deleting it
  */
  deleteTodoList(id: any){
    return this.http.delete(this.url + 'delete/' + id);
  }
  /*
  gets all elements of a list
  */
  getTodoElements(listId: any):Observable<any[]>{
    return this.http.get<any[]>(this.url + listId + '/todoListElement/all');
  }
  /*
  todo element gets values for: content,
  all values are needed
  */
  addTodoElement(listId: any, val:any){
    return this.http.post(this.url + listId + '/todoListElement/add', val);
  }
  /*
  update todo element needs all previous data
  */
  updateTodoElement(listId: any, id: any, val:any){
    return this.http.put(this.url + listId + '/todoListElement/update/' + id, val);
  }
  /*
  changing element's status
  */
  changeElementStatus(listId: any, id: any, status:any){
    return this.http.get(this.url + listId + '/todoListElement/update/' + id + '/' + status);
  }
  /*
  id of todo element is needed for deleting it
  */
  deleteTodoElement(listId: any, id: any){
    return this.http.delete(this.url + listId +  '/todoListElement/delete/' + id);
  }
}
