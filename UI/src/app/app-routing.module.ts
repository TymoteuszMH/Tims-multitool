import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AverageComponent } from './components/average/average.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteDetailsComponent } from './components/notes/note-details/note-details.component';
import { LoginDataService } from './services/logindata.service';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TodoComponent } from './components/todo/todo.component';

export const notlogged: Routes = [
  {path:'', component:LoginComponent},
  {path: '**', redirectTo: ''}
];
export const logged: Routes = [
  {path:'home', component:HomeComponent},
  {path:'edit-user', component:EditUserComponent},
  {path:'average', component:AverageComponent},
  {path:'notes', component:NotesComponent},
  {path:'note-details/:id', component:NoteDetailsComponent},
  {path:'todo', component:TodoComponent},
  {path:'calendar', component:CalendarComponent},
  {path: '**', redirectTo: 'home'}
];
//checking if user is logged, changing site's route
function CheckLog(){
  LoginDataService.check();
  if(LoginDataService.logged=='1'){
    return logged;
  }else{
    return notlogged;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(CheckLog())],
  exports: [RouterModule]
})
export class AppRoutingModule { }
