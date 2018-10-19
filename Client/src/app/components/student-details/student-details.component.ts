import { Component, OnInit, Input, Output, Inject, forwardRef } from '@angular/core';
import { Student } from '../../classes/student';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { HebrewDate } from '../../classes/hebrewDate';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { GlobalService } from '../../services/global.service';
import { Yeshiva } from '../../classes/Yeshiva';
import { AppComponent } from '../app/app.component';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private route: ActivatedRoute, private router: Router, 
    private globalService: GlobalService,@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) { }
  status: string;


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
  yeshivaListOfStudent: Yeshiva[];
  yeshivaSelected: Yeshiva;
  currentUser: number;
  days:string[]=["א","ב","ג","ד","ה","ו","ז","ח","ט","י","יא","יב","יג","יד","טו","טז","יז","יח","יט","כ","כא","כב","כג","כד","כה","כו","כז","כח","כט","ל"];
  monthes:string[]=["תשרי","חשוון","כסלו","טבת","שבט","אדר","ניסן","אייר","סיוון","תמוז","אב","אלול"];
  dateDayArr = new Array<string>();
  dateMonthArr = new Array<string>();
  addYeshiva = false;
  yeshivaId: number;
  e;
  message = 'dfds';
  flagDelete = false;
  header = 'מחיקת ישיבה';

  ngOnInit() {

    this.bornDateHebrewStudent = new HebrewDate();
    this.diedDateHebrewFather = new HebrewDate();
    this.diedDateHebrewMother = new HebrewDate();
    this.yeshivaSelected = new Yeshiva();
    // this.yeshivaSelected.nvCity="";
    // this.yeshivaSelected.nvAddress="";
    // this.addYeshivaToStudent.iPersonId
    // this.addYeshivaToStudent.iYeshivaId

    this.currentUser = this.globalService.getUser().iPersonId;

    this.appProxy.post("GetAllYeshivot").then(date => { this.yeshivaList = date; })

    this.route.parent.params.subscribe(params => {

      this.paramRout = params['iPersonId'];

      if (params['iPersonId'] != '0') {

        this.appProxy.post("GetStudentById", { iPersonId: this.paramRout }).then(data => {

          this.student = data;
          // this.student.dtBirthdate.getTime();
          // this.student.dtAddStudentDate.getTime();
          this.sysTableService.getValues(SysTableService.dataTables.participationType.iSysTableId).then(data => {
            this.status = data.filter(x => x.iSysTableRowId == this.student.iStatusType)[0].nvValue;
          });

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
    this.appProxy.post("GetYeshivotOfStudent", { iPersonId: this.paramRout }).then(data => this.yeshivaListOfStudent = data);


    this.dateMonthArr.push("תשרי"); this.dateMonthArr.push("חשון"); this.dateMonthArr.push("כסלו"); this.dateMonthArr.push("טבת");
    this.dateMonthArr.push("שבט"); this.dateMonthArr.push("אדר"); this.dateMonthArr.push("ניסן"); this.dateMonthArr.push("אייר");
    this.dateMonthArr.push("סיון"); this.dateMonthArr.push("תמוז"); this.dateMonthArr.push("אב"); this.dateMonthArr.push("אלול");

    this.dateDayArr.push("א"); this.dateDayArr.push("ב"); this.dateDayArr.push("ג"); this.dateDayArr.push("ד"); this.dateDayArr.push("ה");
    this.dateDayArr.push("ו"); this.dateDayArr.push("ז"); this.dateDayArr.push("ח"); this.dateDayArr.push("ט"); this.dateDayArr.push("י");
    this.dateDayArr.push('י"א'); this.dateDayArr.push('י"ב'); this.dateDayArr.push('י"ג'); this.dateDayArr.push('י"ד'); this.dateDayArr.push('ט"ו');
    this.dateDayArr.push('ט"ז'); this.dateDayArr.push('י"ז'); this.dateDayArr.push('י"ח'); this.dateDayArr.push('י"ט'); this.dateDayArr.push('כ');
    this.dateDayArr.push('כ"א'); this.dateDayArr.push('כ"ב'); this.dateDayArr.push('כ"ג'); this.dateDayArr.push('כ"ד'); this.dateDayArr.push('כ"ה');
    this.dateDayArr.push('כ"ו'); this.dateDayArr.push('כ"ז'); this.dateDayArr.push('כ"ח'); this.dateDayArr.push('כ"ט'); this.dateDayArr.push('ל');



  }


  selectYesh(event: any) {
    if (event.currentTarget.value == 'בחר מוסד') {
      this.yeshivaSelected.nvAddress = null;
      this.yeshivaSelected.nvCity = null;
    }

    this.yeshivaList.forEach(e => {
      if (e.nvYeshivaName == event.currentTarget.value) {
        this.yeshivaSelected.nvYeshivaName = e.nvYeshivaName;
        this.yeshivaSelected.nvAddress = e.nvAddress;
        this.yeshivaSelected.nvCity = e.nvCity;
        this.yeshivaSelected.iYeshivaId = e.iYeshivaId;
      }

    })
  }
  deleteYeshiva(yeshiva) {
    //alert(yeshiva.iYeshivaId);
    this.yeshivaId = yeshiva.iYeshivaId;
    this.message='האם אתה בטוח שברצונך למחוק את '+yeshiva.nvYeshivaName+'?';
    this.flagDelete = true;
  }


  //מחיקת ישיבה לתלמיד
  deleteYeshivaOfStudent(iYeshivaId: number) {

    this.appProxy.post("DeleteYeshivaOfStudent", {
      iPersonId: this.paramRout, iYeshivaId: iYeshivaId, iUserId: this.currentUser
    }).then(data => { this._parent.openMessagePopup('הישיבה נמחקה בהצלחה!') }, err => { alert("שגיאה במחיקת ישיבהיד"); });
    var i = 0;
    this.yeshivaListOfStudent.forEach(e => {
      debugger;
      if (e.iYeshivaId == iYeshivaId)
        this.yeshivaListOfStudent.splice(i, 1);
      i++;
    });
  }

  addSelectYeshivaToStudent() {
    debugger;
    this.appProxy.post("AddYeshivaToStudent", {
      iPersonId: this.paramRout, iYeshivaId:
        this.yeshivaSelected.iYeshivaId, iUserId: this.currentUser
    }).then(data => {
      if (data)
        //alert("הישיבה נוספה בהצלחה")
        this._parent.openMessagePopup('הישיבה נוספה בהצלחה!');
      else this._parent.openMessagePopup('שגיאה בהוספת ישיבה');
    }
      , err => alert("שגיאה"))

    var newYeshiva: Yeshiva = new Yeshiva();
    newYeshiva.nvCity = this.yeshivaSelected.nvCity;
    newYeshiva.nvAddress = this.yeshivaSelected.nvAddress;
    this.yeshivaListOfStudent.push(newYeshiva);

  }




  changeStatusParent(parentType) {

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
    //debugger;
    if (this.save.name != '')
      this.student.nvImgStudent = this.save.name;
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
      this.appProxy.post("UpdateStudent", { student: this.student, base64Image: this.save.image, iUserId: this.currentUser }).then(data => {
        if (this.status == 'תלמיד')
          alert("פרטי התלמיד עודכנו בהצלחה");
        else
          alert("פרטי הבוגר עודכנו בהצלחה");

      }, err => {
        if (this.status == 'תלמיד')
          alert("שגיאה בעריכת תלמיד");
        else
          alert("שגיאה בעריכת בוגר");
      });
    }
    else

      this.appProxy.post("AddStudent", { student: this.student, base64Image: this.save.image, iUserId: this.currentUser }).then(data => { alert("התלמיד נוסף בהצלחה"); }, err => { alert("שגיאה בהוספת תלמיד"); });

  }

  get baseFileUrl() {
    return AppProxy.getBaseUrl() + 'Files/';
  }
  public save = { image: '', name: '' };


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
          if (callback) { callback.image = nvBase64File; callback.name = name; }
        }
        fileReader.readAsDataURL(file);

      }
    }

  }
}










