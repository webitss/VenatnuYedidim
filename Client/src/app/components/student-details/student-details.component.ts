import { Component, OnInit, Input, Output, Inject, forwardRef, ViewChild } from '@angular/core';
import { Student } from '../../classes/student';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { HebrewDate } from '../../classes/hebrewDate';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { GlobalService } from '../../services/global.service';
import { Yeshiva } from '../../classes/Yeshiva';
import { AppComponent } from '../app/app.component';
import { LetterEbrew } from '../../classes/LetterEbrew';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { KeyValue } from '../../classes/key-value';
import { Avrech } from '../../classes/avrech';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  status: string;
  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private route: ActivatedRoute, private router: Router,
    private globalService: GlobalService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  @ViewChild(NgForm) form;
  @Input() student: Student;
  statusType: any = { boger: 160, student: 159 };
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
  avrechList:Avrech[];
  AvrechSelected:Avrech=null;
  currentUser: number;
  days: string[] = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל"];
  monthes: string[] = ["תשרי", "חשוון", "כסלו", "טבת", "שבט", "אדר", "ניסן", "אייר", "סיוון", "תמוז", "אב", "אלול"];
  foreignDays: Array<number> = [];
  foreignMonthes: Array<KeyValue>;
  foreignDate:string;
d:string;
  // this.foreignMonthes=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  foreignYearsList: Array<string>;



  lenOfMonth: number;

  dateDayArr = new Array<string>();
  dateMonthArr = new Array<string>();
  //dateYearArr = new Array<any>();
  addYeshiva = false;
  yeshivaId: number;
  change: boolean;
  flag: boolean = false;
  message: string;
  public hebrewYearsList: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
    'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
    'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
    'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
    'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
    'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
    'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];

  e;
  // message = 'dfds';
  flagDelete = false;
  header = 'מחיקת ישיבה';
  currentYear: Date = new Date();
  letterArr = new Array<LetterEbrew>();


  ngOnInit() {
    this.foreignMonthes = [
      { id: 1, text: "Jan" },
      { id: 2, text: "Feb" },
      { id: 3, text: "Mar" },
      { id: 4, text: "Apr" },
      { id: 5, text: "May" },
      { id: 6, text: "Jun" },
      { id: 7, text: "Jul" },
      { id: 8, text: "Aug" },
      { id: 9, text: "Sep" },
      { id: 10, text: "Oct" },
      { id: 11, text: "Nov" },
      { id: 12, text: "Dec" },
    ];

    this.lenOfMonth = 30
    this.dateYear();
    this.generateDay();
    this.bornDateHebrewStudent = new HebrewDate();
    this.diedDateHebrewFather = new HebrewDate();
    this.diedDateHebrewMother = new HebrewDate();
    this.yeshivaSelected = new Yeshiva();
    this.AvrechSelected=new Avrech();
    // this.yeshivaSelected.nvCity="";
    // this.yeshivaSelected.nvAddress="";
    // this.addYeshivaToStudent.iPersonId
    // this.addYeshivaToStudent.iYeshivaId

    this.currentUser = this.globalService.getUser().iPersonId;
    this.appProxy.post("GetAllAvrechim").then(date => { this.avrechList = date; })

    this.appProxy.post("GetAllYeshivot").then(date => { this.yeshivaList = date; })

    this.route.parent.params.subscribe(params => {

      this.paramRout = params['iPersonId'];

      if (params['iPersonId'] != '0') {

        this.appProxy.post("GetStudentById", { iPersonId: this.paramRout }).then(data => {

          this.student = data;
          if (!this.student || !this.student.iPersonId)
            this.change = true;
          // this.student.dtBirthdate.getTime();
          // this.student.dtAddStudentDate.getTime();
          this.sysTableService.getValues(SysTableService.dataTables.participationType.iSysTableId).then(data => {
            this.status = data.filter(x => x.iSysTableRowId == this.student.iStatusType)[0].nvValue;
            this.sysTableService.getValues(SysTableService.dataTables.deathType.iSysTableId).then(data => { this.sysTableRowList = data; });
          });
          this.student['fYears'] = this.student.dtBirthdate ? this.student.dtBirthdate.getFullYear() : 0;
          // this.student['fMonthes'] = this.foreignMonthes[this.student.dtBirthdate?this.student.dtBirthdate.getMonth().toString():null];
          this.student['fMonthes'] = this.student.dtBirthdate.getMonth();
          // this.student['fMonthes']['text']=this.foreignMonthes[this.student.dtBirthdate.getMonth()].text;
          this.student['fDays'] = this.student.dtBirthdate ? this.student.dtBirthdate.getDate() : 0;

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
            this.fatherDead = true;
          }
          if (this.student.bDeathMother == true) {
            this.motherDeadDetails = true;
            this.isCheckedMother = true;
            this.motherDead = true;
          }



        });
      }
      else {
        this.student = new Student();
        this.student.iPersonId = 0;
        this.student.iStatusType = 159;
        // this.student.iCauseOfDeathFather=0;
        // this.student.iCauseOfDeathMother=0;
        this.student.iStudentId = 0;
        this.student.bDeathFather = false;
        this.student.bDeathMother = false;
        this.change = true;
      }

    });
    this.appProxy.post("GetYeshivotOfStudent", { iPersonId: this.paramRout }).then(data => this.yeshivaListOfStudent = data);



    this.letterArr.push({ nvChar: "א", iValue: 1 }); this.letterArr.push({ nvChar: "ב", iValue: 2 }); this.letterArr.push({ nvChar: "ג", iValue: 3 });
    this.letterArr.push({ nvChar: "ד", iValue: 4 }); this.letterArr.push({ nvChar: "ה", iValue: 5 }); this.letterArr.push({ nvChar: "ו", iValue: 6 });
    this.letterArr.push({ nvChar: "ז", iValue: 7 }); this.letterArr.push({ nvChar: "ח", iValue: 8 }); this.letterArr.push({ nvChar: "ט", iValue: 9 });
    this.letterArr.push({ nvChar: "י", iValue: 10 }); this.letterArr.push({ nvChar: "כ", iValue: 20 }); this.letterArr.push({ nvChar: "ל", iValue: 30 });
    this.letterArr.push({ nvChar: "מ", iValue: 40 }); this.letterArr.push({ nvChar: "נ", iValue: 50 }); this.letterArr.push({ nvChar: "ס", iValue: 60 });
    this.letterArr.push({ nvChar: "ע", iValue: 70 }); this.letterArr.push({ nvChar: "פ", iValue: 80 }); this.letterArr.push({ nvChar: "צ", iValue: 90 });
    this.letterArr.push({ nvChar: "ק", iValue: 100 }); this.letterArr.push({ nvChar: "ר", iValue: 200 }); this.letterArr.push({ nvChar: "ש", iValue: 300 });
    this.letterArr.push({ nvChar: "ת", iValue: 400 });
    this.letterArr = this.letterArr.sort((n1, n2) => { return n2.iValue - n1.iValue });
    //var dateUrl = "http://www.hebcal.com/converter/?cfg=json&gy=" + 2018 + "&gm=" + 4 + "&gd=" + 12 + "&g2h=1";
    this.hebrewYearsList = [];
    for (var i = this.currentYear.getFullYear(); i > 1950; i--) {
      let year = (i + 3760) % 1000;
      let strYear = ''
      while (year > 0) {
        let j = 0;
        while (j < this.letterArr.length && j > -1) {
          if (this.letterArr[j].iValue <= year) {
            strYear += this.letterArr[j].nvChar;
            year = year - this.letterArr[j].iValue;
            j = -1;
          }
          else
            j++;
        }
      }
      this.hebrewYearsList.push(strYear);
      //this.dateYearArr.push(i);
    }
    // for (var i = 0; i < this.dateYearArr.length - 1; i++) {
    //   // const hebrewDate = require("hebrew-date");
    //   // this.dateYearArr[i] = hebrewDate(new Date(this.dateYearArr[i], 0, 0)).year;
    //   this.dateYearArr[i] = this.calcEbrewDatw(this.dateYearArr[i]);
    // }
  }
  dateYear() {
    this.foreignYearsList = new Array<string>();
    for (var i = this.currentYear.getFullYear(); i > 1950; i--) {
      // let year = i ;
      // let strYear = ''
      // while (year > 0) {
      //   let j = 0;
      //   while (j < this.letterArr.length && j > -1) {
      //     if (this.letterArr[j].iValue <= year) { 
      //       strYear+=this.letterArr[j].nvChar;
      //       year = year - this.letterArr[j].iValue; 
      //       j = -1; }
      //     else
      //       j++;
      //   }
      // }
      this.foreignYearsList.push(i.toString());
      //this.dateYearArr.push(i);
    };
  }
  dateDay() {
    this.student.dtBirthdate = new Date(Number(this.student['fYears']), (this.student['fMonthes']), this.student['fDays']);
    // console.log(this.student.dtBirthdate);
    this.lenOfMonth = new Date(this.student['fYears'], (this.student['fMonthes']), 0).getDate();
    debugger;
    this.generateDay();

  }
  generateDay() {
    debugger;
    this.foreignDays = [];
    for (var i = 1; i <= this.lenOfMonth; i++)
      this.foreignDays.push(i);
  }
  shift(newStatus) {
    this.appProxy.post("UpdateStatusStudent", { iPersonId: this.student.iPersonId, iStatusType: newStatus }).then(
      data => {
        this._parent.openMessagePopup("השמירה בוצעה בהצלחה");
        this.student.iStatusType = newStatus;
      }
    );

  }
  calcEbrewDatw(year) {

    year = year - 5000;
    let yearString = "";
    for (let i = this.letterArr.length - 1; i > 0; i--) {
      while (year - this.letterArr[i].iValue > 0) {
        yearString += this.letterArr[i].nvChar;
        year -= this.letterArr[i].iValue;
      }
    }
    return yearString;
  }
  hebrewDate(){
    alert("come");
   this.d="";
//לשרשר את התאריך שמולא בטופס, להמיר את המחרוזת לטיפוס date' לשלוח לשרת ולבדוק
    this.appProxy.post("castEbrewToForeign",{hebrewDate:this.bornDateHebrewStudent}).then(
      data=>{
alert(HebrewDate);
      }
    )
  }

  selectYesh(event: any) {
debugger;
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

  deleteYeshiva(yeshiva: Yeshiva) {
    this.flagDelete = true;
    this.yeshivaId = yeshiva.iYeshivaId;
    this.message = 'האם אתה בטוח שברצונך למחוק את הישיבה ' + yeshiva.nvYeshivaName + '?';

  }

  //מחיקת ישיבה לתלמיד
  deleteYeshivaOfStudent() {

    this.appProxy.post("DeleteYeshivaOfStudent", {
      iPersonId: this.paramRout, iYeshivaId: this.yeshivaId, iUserId: this.currentUser
    }).then(data => { this._parent.openMessagePopup("הישיבה נמחקה בהצלחה!") }, err => { this._parent.openMessagePopup("שגיאה במחיקת ישיבהיד"); });
    var i = 0;
    this.yeshivaListOfStudent.forEach(e => {
      if (e.iYeshivaId == this.yeshivaId)
        this.yeshivaListOfStudent.splice(i, 1);
      i++;
    });
  }



  // When not providing a date object, the months are one-indexed

  // { year: 5776, month: 13, date: 29, month_name: 'Elul' }


  // changeForm(){
  //   this.change=true;
  // }
  selectAv(event: any) {
    debugger;
    if (event.currentTarget.value == 'בחר אברך') {
      this.AvrechSelected.nvAddress = null;
      this.AvrechSelected.nvCity = null;
    }

    this.avrechList.forEach(e => {
      debugger;
      if (e.nvFirstName+" "+e.nvLastName == event.currentTarget.value) {
        this.AvrechSelected.nvFirstName = e.nvFirstName;
        this.AvrechSelected.iPersonId = e.iPersonId;
        // this.AvrechSelected. = e.nvCity;
        // this.yeshivaSelected.iYeshivaId = e.iYeshivaId;
        debugger;
        // alert(this.AvrechSelected.nvFirstName);
      }

    })
    // this.addSelectAvrechToStudent();
  }

  // addSelectAvrechToStudent(){
  //   this.appProxy.post("AddAvrechToStudent", {
  //     iStudentId: this.paramRout, iPersonId:
  //       this.AvrechSelected.iPersonId, iUserId: this.currentUser
  //   }).then(data => {
      
  //   }
  //     , err => this._parent.openMessagePopup("שגיאה"))

  //   var newAvrech: Avrech = new Avrech();
  //   newAvrech.nvFirstName = this.AvrechSelected.nvFirstName;
  //   // newAvrech.nvAddress = this.yeshivaSelected.nvAddress;
  //   // newYeshiva.nvYeshivaName = this.yeshivaSelected.nvYeshivaName;
  // }

  addSelectYeshivaToStudent() {
    this.appProxy.post("AddYeshivaToStudent", {
      iPersonId: this.paramRout, iYeshivaId:
        this.yeshivaSelected.iYeshivaId, iUserId: this.currentUser
    }).then(data => {
      if (data)
        this._parent.openMessagePopup("הישיבה נוספה בהצלחה!");
      else this._parent.openMessagePopup("שגיאה בהוספת ישיבה")
    }
      , err => this._parent.openMessagePopup("שגיאה"))

    var newYeshiva: Yeshiva = new Yeshiva();
    newYeshiva.nvCity = this.yeshivaSelected.nvCity;
    newYeshiva.nvAddress = this.yeshivaSelected.nvAddress;
    newYeshiva.nvYeshivaName = this.yeshivaSelected.nvYeshivaName;
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


  saveStudent(destroy = false) {
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
          this._parent.openMessagePopup("פרטי התלמיד עודכנו בהצלחה!");
        else
          this._parent.openMessagePopup("פרטי הבוגר עודכנו בהצלחה!");
        this.change = false;
        if (!destroy)
          this.backToGridStudent();

      }, err => {
        if (this.status == 'תלמיד')
          alert("שגיאה בעריכת תלמיד");
        else
          alert("שגיאה בעריכת בוגר");
        //this.change = false;
      });

    }

    else
      this.appProxy.post("AddStudent", { student: this.student, base64Image: this.save.image, iUserId: this.currentUser, iAverchId: this.AvrechSelected.iPersonId}).then(data => {
debugger;
if(data)
        this._parent.openMessagePopup("התלמיד נוסף בהצלחה!");
        this.change = false;
        if (!destroy)
          this.backToGridStudent();
      }, err => {
        this._parent.openMessagePopup("שגיאה בהוספת תלמיד!");
      });

  }
  backToGridStudent() {
    if (this.student == undefined)
      this.router.navigate(["students"]);
    else {
      this.sysTableService.getValues(SysTableService.dataTables.participationType.iSysTableId).then(data => {
        if (this.student.iStatusType == data.filter(d => d.nvValue == 'תלמיד')[0].iSysTableRowId)
          this.router.navigate(["students"]);
        else
          this.router.navigate(["graduates"]);
      }
      )
    }
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

  message2;
  header2;
  s() {

  }
  ngOnDestroy() {
    if (this.change) {
      let v = confirm("האם ברצונך לשמור?");
      if (v)
        this.saveStudent(true);
    }

  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!(event.keyCode != 8 && !pattern.test(inputChar))) {
      event.preventDefault();
    }
  }
  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}










