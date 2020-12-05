import { stringify } from 'querystring';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-widget',
  templateUrl: './calculator-widget.component.html',
  styleUrls: ['./calculator-widget.component.scss'],
})
export class CalculatorWidgetComponent implements OnInit {

  result: number;
  first: number = Math.PI;
  second: number;
  operand: string = "0";
  display: string = "0";
  nexNum: boolean = false;
  end: boolean = false;

  constructor() { }

  ngOnInit() {}

  addNumber(num: number){
    if(this.end == true && this.operand=="0"){
      this.first= Math.PI;
      this.display = "0";
      this.end = false;
    }
    if(this.first!= Math.PI){
      this.nexNum = true;
    }
    if(this.display=="0"){
      this.display=`${num}`;
    }
    else
      this.display+=`${num}`;
  }

  addSymbol(sym: string){

    if(this.first== Math.PI){
      this.first = parseInt(this.display);
    }
    if(sym=="C"){
      this.display="0";
      this.first =  Math.PI;
      this.nexNum = false;
      this.operand = "0";
    }
    else{
      console.log(this.first);
      console.log(this.operand);
      if(this.operand=="0"){
        this.display+=sym;
        this.operand=sym;
      }
      else if(!this.nexNum){
        this.display=''+this.first+sym;
        this.operand=sym;
      }
      else{
        this.second = parseInt(this.display.split(this.operand, 2)[1]);
        console.log(this.second);
        this.calc(sym);
      }
    }
    
    
  }

  calc(sym: string){
    switch(this.operand){
      case "+":
        this.result = this.first + this.second;
        break;
      case "-":
        this.result = this.first - this.second; 
        break;
      case "x":
        this.result = this.first * this.second; 
        break;
      case "÷":
        this.result = this.first / this.second; 
        break;
    }
    if(sym=="="){
      this.display=''+this.result;
      this.first = this.result;
      this.nexNum = false;
      this.operand = "0";
      this.end = true;
    }
    else{
      this.first = this.result;
      this.operand = sym;
      this.display = ''+this.first+sym;
    }
  }

}
