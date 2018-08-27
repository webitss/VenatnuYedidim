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

  student1:Student;
student2:Student;
student:Student=new Student();
model:number;


  studentList:Student[];
  students:boolean=false;

  id:number;

  constructor(private activatedRoute: ActivatedRoute, private appProxy:AppProxy) { }

  ngOnInit() {
   this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    });
    this.appProxy.post('GetAvrechStudents', { iPersonId: 1 }).then(
      data => 
      {
        this.studentList = data;
debugger;
      }
      , err => alert(err));
  }
  student1Change(event:any){
    this.studentList.forEach(e=>{
      if(e.iPersonId==event.currentTarget.value)
      this.student1=e;
      debugger;
    });
  }
  student2Change(event:any){
    this.studentList.forEach(e=>{
    if(e.iPersonId==event.currentTarget.value)
      this.student2=e;
    });

   }

   unionOk()
   {
     alert("ddddd");
     debugger;
   }
}
