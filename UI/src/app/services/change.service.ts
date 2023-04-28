import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { notlogged, logged} from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  constructor(private router: Router) { }
  //function to change routing
  change(isLogged: boolean){
    if(isLogged){
      this.router.resetConfig(logged);
    }else{
      this.router.resetConfig(notlogged);
    }
    this.router.navigate([ '/' ]);
  }
}
