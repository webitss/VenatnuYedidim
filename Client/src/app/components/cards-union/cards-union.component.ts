import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards-union',
  templateUrl: './cards-union.component.html',
  styleUrls: ['./cards-union.component.css']
})
export class CardsUnionComponent implements OnInit {

  student1:number;
student2:number;
  studentList:Student[];
  students:boolean=false;

  student2List:string[]=['aaa','aalll','dd'];
  id:number;
//   title:string="רשימת תלמידים";
//   inputTitle:string="בחר תלמידים";

// listToSelect=[];

  constructor(private activatedRoute: ActivatedRoute, private appProxy:AppProxy) { }

  ngOnInit() {
   this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    });

    this.appProxy.post('GetAvrechStudents', { iPersonId: 1 }).then(
      data => 
      {
        this.studentList = data;

      }
      , err => alert(err));
  }
  student1Change(event:any){
   this.student1=event.currentTarget.value;
    alert(this.student1);
  }
  student2Change(event:any){
    this.student2=event.currentTarget.value;
     alert(this.student2);
   }
}
