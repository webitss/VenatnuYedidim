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
      if (params['iPersonId'] != '0') {

        this.appProxy.post("GetStudentById", { iPersonId: params['iPersonId'] }).then(data => {

          this.student = data;
          // this.student.dtBirthdate.getTime();
          // this.student.dtAddStudentDate.getTime();


          this.bornDateStudentArr = this.student.nvBirthdate.split(" ");
          this.bornDateHebrewStudent.Day = this.bornDateStudentArr[0];
          this.bornDateHebrewStudent.Month = this.bornDateStudentArr[1];
          this.bornDateHebrewStudent.Year = this.bornDateStudentArr[2];

          this.diedDateFatherArr = this.student.nvFatherDeathDate.split(" ");
          this.diedDateHebrewFather.Day = this.diedDateFatherArr[0];
          this.diedDateHebrewFather.Month = this.diedDateFatherArr[1];
          this.diedDateHebrewFather.Year = this.diedDateFatherArr[2];

          this.diedDateMotherArr = this.student.nvMotherDeathDate.split(" ");
          this.diedDateHebrewMother.Day = this.diedDateMotherArr[0];
          this.diedDateHebrewMother.Month = this.diedDateMotherArr[1];
          this.diedDateHebrewMother.Year = this.diedDateMotherArr[2];

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
    debugger;
    this.student.nvBirthdate = this.bornDateHebrewStudent.Day + " " + this.bornDateHebrewStudent.Month + " " + this.bornDateHebrewStudent.Year;
    if (this.paramRout != '0') {
      this.appProxy.post("UpdateStudent", { student: this.student, iUserId: this.globalService.getUser().iPersonId}).then(data => { alert("פרטי התלמיד עודכנו בהצלחה"); }, err => { alert("שגיאה בעריכת תלמיד"); });
    }
    
    else {
      if (this.fatherDead = true) {
        this.student.bDeathFather = true;
        this.student.nvFatherDeathDate = this.diedDateHebrewFather.Day + " " + this.diedDateHebrewFather.Month + " " + this.diedDateHebrewFather.Year;
      }
      else {
        this.student.nvFatherDeathDate = null;
      }
      if (this.motherDead = true) {
        this.student.bDeathMother = true;
        this.student.nvMotherDeathDate = this.diedDateHebrewMother.Day + " " + this.diedDateHebrewMother.Month + " " + this.diedDateHebrewMother.Year;
      }
      else {
        this.student.nvMotherDeathDate = null;
      }
      debugger;
      this.appProxy.post("AddStudent", { student: this.student, iUserId: this.globalService.getUser().iPersonId}).then(data => { alert("התלמיד נוסף בהצלחה"); }, err => { alert("שגיאה בהוספת תלמיד"); });
    }
  }


  protected save = { document: '', name: '' };


  loadDocument(event, callback) {
    let name, type, nvBase64File;

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];

      if ((window as any).FileReader) {
        var fileReader = new FileReader();
        name = file.name;
        type = file.type;

        fileReader.onload = function (e) {
          nvBase64File = (e.target as any).result;
          if (callback) { callback.document = nvBase64File; callback.name = name; }
        }
        fileReader.readAsDataURL(file);

      }
    }

  }


  // saveFile() {
  //   //debugger;
  //   this.document.nvDocumentName = this.save.name;
  //   this.document.nvDocumentType = this.save.type;

  //   this.appProxy.post('SetDocument', { document: this.document, nvBase64File: this.save.document, iUserId: this.globalService.getUser()['iUserId'] }).then(
  //     data => {
  //       if (data == 0)
  //         alert("error in save data")
  //       else { this.document.iDocumentId = data; this.closeDialog(); }
  //     }
  //     , err => alert(err));
  // }


}










