import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-cards-union',
  templateUrl: './cards-union.component.html',
  styleUrls: ['./cards-union.component.css']
})
export class CardsUnionComponent implements OnInit {

  student1List:Student[];
  student2List:Student[];


  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
    this.appProxy.get("getAllStudentsName").then(
      data=>{
        this.student1List=data;
        this.student2List=data;
      }
    );
  }

}
