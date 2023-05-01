import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.css']
})
export class AverageComponent {
  average_list = "";
  average:number = 0.00;

  count(){
    this.average = 0.00;
    var numbers = this.average_list.split(",");
    numbers.forEach((el) =>{
      if(!isNaN(Number(el))){
        this.average += Number(el);
      }
    })
    this.average = this.average / numbers.length;
  }

}
