import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';

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

  constructor(private activatedRoute: ActivatedRoute, private appProxy:AppProxy,private globalService:GlobalService) { }

  ngOnInit() {
    this.student.dtAddStudentDate=null;
    this.student.dtBirthdate=null;
// this.student.dtAddStudentDate.toLocaleDateString();
   this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    });
    this.appProxy.post('GetAvrechStudents', { iPersonId:this.globalService.getUser()['iUserId'] }).then(
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
public studentValues;
public student1Values;
public  aa;
   unionOk()
   {

for(var f in this.student)
{
 if(this.student[f]==null)
 this.student[f]=this.student1[f];
}

 this.appProxy.post('UnionCards', { student:this.student,iStudent2:this.student2.iPersonId }).then(
      data => 
      {
       alert("האיחוד התבצע בהצלחה!")
      }
      , err => alert("שגיאה באיחוד הכרטיסים"));   
}

checkDisabled(field)
{
if(this.student1[field]==this.student2[field])
return true;
else
return false;
}
}
