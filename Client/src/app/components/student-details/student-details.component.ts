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

  constructor(private appProxy: AppProxy, private route: ActivatedRoute, private router: Router) { }

  @Input() student: Student

  paramRout: any;
  fatherDead: boolean;
  motherDead: boolean;
  fatherDeadDetails: boolean;
  motherDeadDetails: boolean;
  isCheckedFather: boolean;
  isCheckedMother: boolean;

  ngOnInit() {

    this.route.parent.params.subscribe(params => {

      if (params['iPersonId'] != '0') {
        this.appProxy.post("GetStudentById", { iPersonId: params['iPersonId'] }).then(data => {
          this.student = data;
          if (this.student.bDeathFather == true) {
            this.fatherDeadDetails = true;
            this.isCheckedFather = true;
          }
          if (this.student.bDeathMother) {
            this.motherDeadDetails = true;
            this.isCheckedMother = true;
          }
        });
      }
      else {
        this.student = new Student();
      }
    });

    this.route.params.subscribe(params => { this.paramRout = params['iPersonId'] });



  }
  changeStatusParent(parentType) {
    switch (parentType) {
      case 1:
        if (this.student.bDeathFather == true) {
          if (this.isCheckedFather == false) {
            this.fatherDead = true;
            this.fatherDeadDetails = true;
            this.isCheckedFather = true; break;
          }
          this.fatherDead = false;
          this.fatherDeadDetails = false;
          this.isCheckedFather = false
        }
        else this.fatherDead = !this.fatherDead; break;

      case 2:
        if (this.student.bDeathMother == true) {
          if (this.isCheckedMother == false) {
            this.motherDead = true;
            this.motherDeadDetails = true;
            this.isCheckedMother = true; break;
          }

          this.motherDead = false;
          this.motherDeadDetails = false;
          this.isCheckedMother = false
        }
        else this.motherDead = !this.motherDead; break;
    }



  }



  saveStudent() {
    if (this.paramRout != '0') {
      this.appProxy.post("AddStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("התלמיד נוסף בהצלחה"); }, err => { alert("שגיאה בהוספת תלמיד"); });
    }
    else {
      this.appProxy.post("UpdateStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("פרטי התלמיד עודכנו בהצלחה"); }, err => { alert("שגיאה בעריכת תלמיד"); });
    }
  }


}