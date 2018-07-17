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
      }
      alert("success"+data);
      
  }}
      ,err=>alert(err));
  }

}
