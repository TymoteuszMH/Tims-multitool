import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.css']
})
export class AverageComponent {
  /*
  @averageList: takes list of number passed in form
  @average: store average number
  */
  averageList = "";
  average:number = 0.00;
  /*
  @count: takes numbers from averageList and takes them as array, check if there are number and adding them to average, then devides it by count of added numbers
  */
  count(){
    this.average = 0.00;
    var numbers = this.averageList.split(",");
    var elCount = 0;
    numbers.forEach((el) =>{
      if(!isNaN(Number(el))){
        this.average += Number(el);
        elCount++;
      }
    })
    this.average = this.average / elCount;
  }

}
