import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }
id:number;
studentList:Student[];

  ngOnInit() {
    this.id=0;
    this.appProxy.post('GetStudentList',{iUserId:this.id}).then(data=>this.studentList=data,err=>alert(err));
  }

}
