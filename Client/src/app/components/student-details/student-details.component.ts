import { Component, OnInit, Input, Output } from '@angular/core';
import { Student } from '../../classes/student';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { HebrewDate } from '../../classes/hebrewDate';


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
  bornDateHebrewStudent: HebrewDate;
  diedDateHebrewFather: HebrewDate;
  diedDateHebrewMother: HebrewDate;
  bornDateStudentArr = new Array<string>();
  diedDateFatherArr = new Array<string>();
  diedDateMotherArr = new Array<string>();

  
  ngOnInit() {
    this.bornDateHebrewStudent = new HebrewDate();
    this.diedDateHebrewFather = new HebrewDate();
    this.diedDateHebrewMother = new HebrewDate();

    this.route.parent.params.subscribe(params => {
      this.paramRout = params['iPersonId'];
      if (params['iPersonId'] != '0') {


        this.appProxy.post("GetStudentById", { iPersonId: params['iPersonId'] }).then(data => {
          this.student = data;
          debugger;
          this.bornDateStudentArr = this.student.nvBirthdate.split(" ");

          this.bornDateHebrewStudent.Day = this.bornDateStudentArr[0];
          this.bornDateHebrewStudent.Month = this.bornDateStudentArr[1];
          this.bornDateHebrewStudent.Year = this.bornDateStudentArr[2];


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

    // this.route.parent.params.subscribe(params => { this.paramRout = params['iPersonId'] });



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
    alert("success")
    this.student.nvBirthdate = this.bornDateHebrewStudent.Day + " " + this.bornDateHebrewStudent.Month + " " + this.bornDateHebrewStudent.Year;
    if (this.paramRout != '0') {
      this.appProxy.post("UpdateStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("פרטי התלמיד עודכנו בהצלחה"); }, err => { alert("שגיאה בעריכת תלמיד"); });
    }
    else {
      this.appProxy.post("AddStudent", { Student: this.student, iUserId: 3 }).then(data => { alert("התלמיד נוסף בהצלחה"); }, err => { alert("שגיאה בהוספת תלמיד"); });

    }
  }




}