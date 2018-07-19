import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-avrech-students',
  templateUrl: './avrech-students.component.html',
  styleUrls: ['./avrech-students.component.css']
})
export class AvrechStudentsComponent implements OnInit {
  @Output()
  flag: boolean = false;
  id: number;
  students: Student[];
  //מסוג סטודנט עם שליפה מהסרביס
  allStudents: any[] = [{ iPersonId: 1, name: "aaa" }, { iPersonId: 2, name: "bbb" }, { iPersonId: 3, name: "ccc" }, { iPersonId: 4, name: "ddd" }, { iPersonId: 5, name: "abc" }];
  studentsToAdd: any[];
  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy) { }

  cancelAdd() {
    this.flag = false;
  }
  saveAdd() {
    debugger;
    //לקבל את הרשימה המסוננת
    //this.studentsToAdd = filterList;
    this.flag=false;
  }


  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
     this.id= params['iPersonId'];
    }) 
  this.appProxy.post('GetAvrechStudents',{iPersonId:this.id}).then(data=>this.students=data
  ,err=>alert(err));
  }

  deleteStudent(id:number){
    this.appProxy.post('DeleteAvrechStudent',{iAvrechId:this.id,iStudentId:id},).then(data=>{
      if(data==true){    
      for(let i=0;i<this.students.length;i++)
      {
        if(this.students[i].iPersonId==id)
        this.students.splice(i,1);
        break;
      }
  }}
      ,err=>alert(err));
  }

}
