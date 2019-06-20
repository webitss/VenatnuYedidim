import { Component, OnInit, Inject, forwardRef, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Avrech } from '../../classes/avrech';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { AppComponent } from '../app/app.component';
import { SysTableService } from '../../services/sys-table.service';
import { callbackify } from 'util';

@Component({
  selector: 'app-reports-birthday',
  templateUrl: './reports-birthday.component.html',
  styleUrls: ['./reports-birthday.component.css']
})
export class ReportsBirthdayComponent implements OnInit {
  exist: boolean=true;;

  constructor(private appProxy: AppProxy, private router: Router, private globalService: GlobalService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  monthesRegular:string[]=["תשרי", "חשוון", "כסלו", "טבת", "שבט", "אדר", "ניסן", "אייר", "סיוון", "תמוז", "אב", "אלול"]
month:string=null;
id: number;
component;
nvYeshivaCityOfStudents:Map<number,string>;
studentsAssociatedToAvrech:Map<number,string> ;
avrechStudent: Avrech=null;
currentYeshivaOfStudent: Map<number, string>;
citiesOfYeshivotOfStudents: Map<number,string>;
studentsToExcel=[];
@ViewChild('students') students: any;
studentList:Student[];
  ngOnInit() {
    this.currentYeshivaOfStudent = new Map<number, string>();
    // this.component = this.router.url;
    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
    // if (this.component == '/students') {

 
    // }
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('עיר', 'nvCity'));
    this.lstColumns.push(new VyTableColumn('תאריך לידה','nvBirthDate'));
    this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));
    this.lstColumns.push(new VyTableColumn('עיר מוסד', 'nvCityName'));
    this.lstColumns.push(new VyTableColumn('משויך לאברך', 'nvAvrechName'));
    this.lstColumns.push(new VyTableColumn('יתום מ', 'orphan'));

  }
  choose(m){
    this.month=m.value;
    this.exist=true;
  }
  getStudents(){
    
  }
  produceReport(){
debugger;

this.appProxy.post("GetStudentsByMonth",{month:this.month}).then(data=>{
  if(data)
  {
    this.studentList=data;
    if(this.studentList.length>0)
    {

    
      this.appProxy.get("GetStudentsAssociatedToAvrechimNames").then(data => {
        debugger;
        this.studentsAssociatedToAvrech = data;
        this.appProxy.get("GetCurrentYeshivaOfStudent").then(data => {
          this.currentYeshivaOfStudent = data;

          this.appProxy.get("GetCitiesOfYeshivotOfStudents").then(data => {
            this.citiesOfYeshivotOfStudents = data;
          this.studentList.forEach(student => {
          
            student['nvBirthDate']=student.nvBirthdate;
          if((student.bDeathFather==true)&&(student.bDeathMother==true))
              student['orphan']="אב ואם";
            else
            if(student.bDeathFather==true)
              student['orphan']="אב";
              else
                student['orphan']="אם";

          if(this.currentYeshivaOfStudent[student.iPersonId])
          {
            student['nvYeshivaName'] = this.currentYeshivaOfStudent[student.iPersonId];
            student['nvCityName'] = this.citiesOfYeshivotOfStudents[student.iPersonId];
          }
debugger;
student['nvAvrechName']=this.studentsAssociatedToAvrech[student.iPersonId];
//             this.appProxy.post("GetAvrechByStudentId", { iPersonId: student.iPersonId }).then(data => {
//               debugger;
//               this.avrechStudent = data;
//               student['nvAvrechName'] = "";
//                 student['nvAvrechName'] += " " + this.avrechStudent[0].nvFirstName + " " + this.avrechStudent[0].nvLastName;
              
                        
// }),  
this.studentsToExcel.push(student); 

          })
  this.downloadExcel(this.studentsToExcel);
 
        });
      });
     });
  }
  else
  this.exist=false;
  }    
  

}, err => { alert(err); });


 
 this.studentsToExcel=[];
    
  }
  downloadExcel(t) {
debugger;
     this.students.downloadExcel(t)
  }
  
}
