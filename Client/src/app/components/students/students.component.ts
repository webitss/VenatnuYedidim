import { Component, OnInit, ViewChild, Inject, forwardRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router, ActivatedRoute } from '@angular/router';
// import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardsUnionComponent } from '../cards-union/cards-union.component';
import { GlobalService } from '../../services/global.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTableService } from '../../services/sys-table.service';
import { Yeshiva } from '../../classes/Yeshiva';
import { Avrech } from '../../classes/avrech';
import { AppComponent } from '../app/app.component';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  flag: boolean;
  message = 'האם אתה בטוח שברצונך למחוק תלמיד זה?';
  flagDelete = false;
  header = 'מחיקת תלמיד';
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  studentId: number;
  component;

  constructor(private appProxy: AppProxy, private router: Router, private route: ActivatedRoute, private globalService: GlobalService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }
  param: any;
  id: number;
  studentList: Student[];
  yeshivaList: Yeshiva[];
  nvYeshivaCityOfStudents:Map<number,string>;
  studentsAssociatedToAvrech:Map<number,number> ;
  avrechimListOfStudent: Avrech[];
  currentYeshivaOfStudent: Map<number, string>;
  citiesOfYeshivotOfStudents: Map<number,string>;
  private alert: any;
  @ViewChild('students') students: any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  public ngOnInit() {
    this.currentYeshivaOfStudent = new Map<number, string>();
    this.component = this.router.url;
    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
    if (this.component == '/students') {
      this.appProxy.post('GetStudentList', { iUserId: this.id }).then(data => {
        debugger;
        this.studentList = data;
        this.appProxy.get("GetStudentsAssociatedToAvrechim").then(data => {
          this.studentsAssociatedToAvrech = data;
          this.appProxy.get("GetCurrentYeshivaOfStudent").then(data => {
            this.currentYeshivaOfStudent = data;
            this.appProxy.get("GetCitiesOfYeshivotOfStudents").then(data => {
              this.citiesOfYeshivotOfStudents = data;
            this.studentList.forEach(student => {
              // if (this.studentsAssociatedToAvrech.filter(x => x. == student.iPersonId).length > 0)
              // this.appProxy.post('GetAvrechById', { iPersonId:  }).then(data => {

                // student['nvAssociated'] = student.;
            if((student.bDeathFather==true)&&(student.bDeathMother==true))
                student['orphan']="אב ואם";
              else
              if(student.bDeathFather==true)
                student['orphan']="אב";
                else
                  student['orphan']="אם";
              student['nvYeshivaName'] = this.currentYeshivaOfStudent[student.iPersonId];
              student['nvCityName'] = this.citiesOfYeshivotOfStudents[student.iPersonId];
              student['edit'] = '<div class="edit"></div>'
              student['delete'] = '<div class = "delete"></>';
            });
          });
        });
      });
      }, err => { alert(err); });
    }

    else {
      this.message = 'האם אתה בטוח שברצונך למחוק בוגר זה?';
      this.header = 'מחיקת בוגר';
      this.appProxy.post('GetGraduatesList', { iUserId: this.id }).then(data => {
        this.studentList = data;
        // this.studentList.forEach(st => {st['edit'] = '<div class="edit"></div>';})
        this.studentList.forEach(student => {
          student['edit'] = '<div class="edit"></div>'
          student['delete'] = '<div class = "delete"></>';

          this.appProxy.post("GetYeshivotOfStudent", { iPersonId: student.iPersonId }).then(data => {
            this.yeshivaList = data;
            student['nvYeshivaName'] = this.yeshivaList[this.yeshivaList.length - 1].nvYeshivaName;
          });
          this.appProxy.post("GetAvrechimByStudentId", { iPersonId: student.iPersonId }).then(data => {
            this.avrechimListOfStudent = data;
            student['nvAvrechName'] = "";
            this.avrechimListOfStudent.forEach(avrech => {
              student['nvAvrechName'] += " " + avrech.nvFirstName + " " + avrech.nvLastName + '<br/>';
            });

          });
        });
      }//, err => { alert(err); }
      );
    }



    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('מחיקה', 'delete', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('עיר', 'nvCity'));
    this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));
    this.lstColumns.push(new VyTableColumn('עיר מוסד', 'nvCityName'));
    this.lstColumns.push(new VyTableColumn('משויך לאברך', 'nvAssociated', 'checkbox'));
    this.lstColumns.push(new VyTableColumn('יתום מ', 'orphan'));

  }
  lstDataRows = [];
  onClose(e) {
    if (e.iPersonId) {
      this.appProxy.post('GetStudentList', { iUserId: this.id }).then(data => {
        this.studentList = data;
        this.studentList.forEach(student => {
          student['edit'] = '<div class="edit"></div>'
          student['delete'] = '<div class = "delete"></>';
        });
     
        this.vyTableComponent.refreshTable(this.studentList);
      
      });
       
     
    }
    this.flag = false;
  }
  
  editStudent(e) {
    this.router.navigate(['students/student/' + e.iPersonId + '/' + 'student-details']);
  }

  deleteStudent() {
    //alert(this.studentId);
    this.appProxy.post('DeleteStudent', { iPersonId: this.studentId, iUserId: this.globalService.getUser()['iUserId'] }).then(res => {
      if (res == true) {
        //alert('נמחק בהצלחה!');
        this._parent.openMessagePopup("המחיקה התבצעה בהצלחה!");
        const s = this.studentList.find(x => x.iPersonId == this.studentId);
        this.studentList.splice(this.studentList.indexOf(s), 1);
        this.vyTableComponent.refreshTable(this.studentList);
      }
      else {
        this._parent.openMessagePopup('המחיקה נכשלה!');
      }
    });
  }

  click(e) {
    // this.avrechId = e.iPersonId;
    if (e.columnClickName == "edit")
      this.editStudent(e);
    else
      this.deleteStudent();

  }
  cardsUnion() {
    this.flag == true
    // const modalRef = this.modalService.open(CardsUnionComponent);

    // modalRef.result.then((result) => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }
  // clickCell:true,
  // type: 'html'

  downloadExcel() {
    this.vyTableComponent.downloadExcel();
  }
  tableToPdf(name)
  {
    this.vyTableComponent.downloadPdf(name,'pdf');
  }
  editAndDeleteStudent(e) {

    if (e.columnClickName == 'edit')
      this.router.navigate(['students/student/' + e.iPersonId + '/' + 'student-details']);
    else {
      // this.alert = confirm("האם אתה בטוח שברצונך למחוק תלמיד זה?");
      // if (this.alert == true) {
      //   this.appProxy.post("DeleteStudent", { iStudent: e.iPersonId, iUserId: this.globalService.getUser() });

      // }
      this.message = 'האם אתה בטוח שברצונך למחוק את ' + e.nvFirstName + ' ' + e.nvLastName + '?';
      //alert(e.nvFirstName);
      //alert(e.iPersonId);
      this.studentId = e.iPersonId;
      this.flagDelete = true;
    }
  }
}


