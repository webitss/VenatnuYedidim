import { Component, OnInit, Input, Output } from '@angular/core';
import { Student } from '../../classes/student';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { HebrewDate } from '../../classes/hebrewDate';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { GlobalService } from '../../services/global.service';
import { Yeshiva } from '../../classes/Yeshiva';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private route: ActivatedRoute, private router: Router, private globalService: GlobalService) { }


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
  sysTableRowList: SysTableRow[];
  yeshivaList: Yeshiva[];

  ngOnInit() {
    this.bornDateHebrewStudent = new HebrewDate();
    this.diedDateHebrewFather = new HebrewDate();
    this.diedDateHebrewMother = new HebrewDate();

    this.appProxy.post("GetAllYeshivot").then(date => { this.yeshivaList = date; })

    this.route.parent.params.subscribe(params => {

      this.paramRout = params['iPersonId'];
      debugger;
      if (params['iPersonId'] != '0') {
       
        this.appProxy.post("GetStudentById", { iPersonId: this.paramRout }).then(data => {
          debugger;
          this.student = data;
          // this.student.dtBirthdate.getTime();
          // this.student.dtAddStudentDate.getTime();

          this.bornDateStudentArr = this.student.nvBirthdate.split(" ");
          this.bornDateHebrewStudent.Day = this.bornDateStudentArr[0];
          this.bornDateHebrewStudent.Month = this.bornDateStudentArr[1];
          this.bornDateHebrewStudent.Year = this.bornDateStudentArr[2];
          if (this.student.nvFatherDeathDate != null) {
            this.diedDateFatherArr = this.student.nvFatherDeathDate.split(" ");
            this.diedDateHebrewFather.Day = this.diedDateFatherArr[0];
            this.diedDateHebrewFather.Month = this.diedDateFatherArr[1];
            this.diedDateHebrewFather.Year = this.diedDateFatherArr[2];

          }
          if (this.student.nvMotherDeathDate != null) {
            this.diedDateMotherArr = this.student.nvMotherDeathDate.split(" ");
            this.diedDateHebrewMother.Day = this.diedDateMotherArr[0];
            this.diedDateHebrewMother.Month = this.diedDateMotherArr[1];
            this.diedDateHebrewMother.Year = this.diedDateMotherArr[2];
          }



          debugger;
          if (this.student.bDeathFather == true) {
            this.fatherDeadDetails = true;
            this.isCheckedFather = true;
          }
          if (this.student.bDeathMother == true) {
            this.motherDeadDetails = true;
            this.isCheckedMother = true;
          }
        });
      }
      else {
        this.student = new Student();
        this.student.bDeathFather = false;
        this.student.bDeathMother = false;

      }
      this.sysTableService.getValues(SysTableService.dataTables.deathType.iSysTableId).then(data => { this.sysTableRowList = data; });

    });
    // this.route.parent.params.subscribe(params => { this.paramRout = params['iPersonId'] });
  }

  changeStatusParent(parentType) {
    debugger;
    switch (parentType) {
      case 1:
        if (this.student.bDeathFather == true) {
          if (this.isCheckedFather == false) {
            this.fatherDead = true;
            this.fatherDeadDetails = true;
            this.isCheckedFather = true;
          }
          else {
            this.student.bDeathFather = false;
            this.fatherDead = false;
            this.fatherDeadDetails = false;
            this.isCheckedFather = false
          }

        }
        else this.fatherDead = !this.fatherDead; break;
      case 2:
        if (this.student.bDeathMother == true) {
          if (this.isCheckedMother == false) {
            this.motherDead = true;
            this.motherDeadDetails = true;
            this.isCheckedMother = true;
          }
          else {
            this.student.bDeathMother = false;
            this.motherDead = false;
            this.motherDeadDetails = false;
            this.isCheckedMother = false
          }

        }
        else this.motherDead = !this.motherDead;
    }
  }


  saveStudent() {
    debugger;
    this.student.nvBirthdate = this.bornDateHebrewStudent.Day + " " + this.bornDateHebrewStudent.Month + " " + this.bornDateHebrewStudent.Year;
    if (this.fatherDead == true) {
      this.student.bDeathFather = true;
      this.student.nvFatherDeathDate = this.diedDateHebrewFather.Day + " " + this.diedDateHebrewFather.Month + " " + this.diedDateHebrewFather.Year;
    }
    else {
      this.student.bDeathFather = false
      this.student.nvFatherDeathDate = null;
    }
    if (this.motherDead == true) {
      this.student.bDeathMother = true;
      this.student.nvMotherDeathDate = this.diedDateHebrewMother.Day + " " + this.diedDateHebrewMother.Month + " " + this.diedDateHebrewMother.Year;
    }
    else {
      this.student.bDeathMother = false
      this.student.nvMotherDeathDate = null;
    }
    if (this.paramRout != '0') {
      this.appProxy.post("UpdateStudent", { student: this.student, iUserId: this.globalService.getUser().iPersonId }).then(data => { alert("פרטי התלמיד עודכנו בהצלחה"); }, err => { alert("שגיאה בעריכת תלמיד"); });
    }
    else
      this.appProxy.post("AddStudent", { student: this.student, iUserId: this.globalService.getUser().iPersonId }).then(data => { alert("התלמיד נוסף בהצלחה"); }, err => { alert("שגיאה בהוספת תלמיד"); });

  }




}










