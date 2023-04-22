import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';

export const login: Routes = [
  {path:'', component:LoginComponent},
  {path: '**', redirectTo: ''}
];
export const site: Routes = [
  {path:'', component:LoginComponent},
  {path: '**', redirectTo: ''}
];
//checking if user is logged, changing site's route
function CheckLog(){
  if(localStorage.getItem('logged')=='1'){
    return site;
  }else{
    return login;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(CheckLog())],
  exports: [RouterModule]
})
export class AppRoutingModule { }
