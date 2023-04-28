import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const notlogged: Routes = [
  {path:'', component:LoginComponent},
  {path: '**', redirectTo: ''}
];
export const logged: Routes = [
  {path:'', component:LoginComponent},
  {path: '**', redirectTo: ''}
];
//checking if user is logged, changing site's route
function CheckLog(){
  if(localStorage.getItem('logged')=='1'){
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
