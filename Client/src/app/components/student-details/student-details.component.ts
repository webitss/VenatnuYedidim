import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../classes/student';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy, private route: ActivatedRoute,private router:Router) { }

  @Input() student: Student

  paramRout:any;
  fatherDead: boolean;
  motherDead: boolean;

  ngOnInit() {
  
    this.route.params.subscribe(params => {
      
      if (params['iPersonId'] != '0') {
        this.appProxy.post("GetStudentById", { iPersonId: params['iPersonId']}).then(data => { this.student = data }, err => alert(err));

      }
      else {
        this.student = new Student();
      }
    });

    
    this.route.params.subscribe(params => {this.paramRout=params['iPersonId']});
  }




  saveStudent() {
    if (this.paramRout!= '0') {
      this.appProxy.post("AddStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("התלמיד נוסף בהצלחה"); }, err => { alert("שגיאה בהוספת תלמיד"); });
    }
    else {
      this.appProxy.post("UpdateStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("פרטי התלמיד עודכנו בהצלחה"); }, err => { alert("שגיאה בעריכת תלמיד"); });
    }
  }


}