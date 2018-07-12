import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-avrech-students',
  templateUrl: './avrech-students.component.html',
  styleUrls: ['./avrech-students.component.css']
})
export class AvrechStudentsComponent implements OnInit {

  id: number;
  students:Student[];
  constructor(private activatedRoute: ActivatedRoute,private appProxy:AppProxy) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
     this.id= params['iPersonId'];
    }) 
  this.appProxy.post('GetAvrechStudents',{iPersonId:1}).then(data=>this.students=data
  ,err=>alert(err));
  }

}
