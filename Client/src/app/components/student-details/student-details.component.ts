import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../classes/student';
import { AppProxy } from '../../services/app.proxy';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy) { }

  @Input() student: Student


  fatherDead: boolean;
  motherDead: boolean;

  ngOnInit() {
    this.student = new Student();
    this.appProxy.post("GetStudentById", { iPersonId: 7 }).then(data => { this.student = data }, err => alert(err));


  }


  saveStudent() {
    if (this.student.iPersonId == 0) {
      this.appProxy.post("AddStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("התלמיד נוסף בהצלחה"); }, err => { alert("שגיאה בהוספת תלמיד"); });
    }
    else {
      this.appProxy.post("UpdateStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("פרטי התלמיד עודכנו בהצלחה"); }, err => { alert("שגיאה בעריכת תלמיד"); });
    }
  }


}