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
  studentId: number;

<<<<<<< HEAD
  constructor(private appProxy: AppProxy, private router: Router, private route: ActivatedRoute, private globalService: GlobalService) { }
=======
  constructor(private appProxy: AppProxy, private router: Router, private route: ActivatedRoute, private globalService: GlobalService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }
>>>>>>> 536dc29d8e3ee6b609be78b697514fd4fd5cbb2b
  param: any;
  id: number;
  studentList: Student[];
  yeshivaListOfStudent: Yeshiva[];
  avrechimListOfStudent: Avrech[]
  private alert: any;
  @ViewChild('students') students: any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  ngOnInit() {

<<<<<<< HEAD


    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
    this.appProxy.post('GetStudentList', { iUserId: this.id }).then(data => {
      this.studentList = data;
      // this.studentList.forEach(st => {st['edit'] = '<div class="edit"></div>';})
      this.studentList.forEach(student => {
        student['edit'] = '<div class="edit"></div>'
        student['delete'] = '<div class = "delete"></>';

        this.appProxy.post("GetYeshivotOfStudent", { iPersonId: student.iPersonId }).then(data => {
          this.yeshivaListOfStudent = data;
          student['nvYeshivaName'] = this.yeshivaListOfStudent[this.yeshivaListOfStudent.length - 1].nvYeshivaName;
=======
    this.component = this.router.url;
    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
    if (this.component == '/students') {
      this.appProxy.post('GetStudentList', { iUserId: this.id }).then(data => {
        this.studentList = data;
        // this.studentList.forEach(st => {st['edit'] = '<div class="edit"></div>';})
        this.studentList.forEach(student => {
          student['edit'] = '<div class="edit"></div>'
          student['delete'] = '<div class = "delete"></>';

          this.appProxy.post("GetYeshivotOfStudent", { iPersonId: student.iPersonId }).then(data => {
            this.yeshivaListOfStudent = data;
            student['nvYeshivaName'] = this.yeshivaListOfStudent[this.yeshivaListOfStudent.length - 1].nvYeshivaName;
          });
          this.appProxy.post("GetAvrechimByStudentId", { iPersonId: student.iPersonId }).then(data => {
            this.avrechimListOfStudent = data;
            student['nvAvrechName'] = "";
            this.avrechimListOfStudent.forEach(avrech => {
              student['nvAvrechName'] += " " + avrech.nvFirstName + " " + avrech.nvLastName + '<br/>';
            });

          });
>>>>>>> 536dc29d8e3ee6b609be78b697514fd4fd5cbb2b
        });
        this.appProxy.post("GetAvrechimByStudentId", { iPersonId: student.iPersonId }).then(data => {
          this.avrechimListOfStudent = data;
          student['nvAvrechName'] = "";
          this.avrechimListOfStudent.forEach(avrech => {
            student['nvAvrechName'] += " " + avrech.nvFirstName + " " + avrech.nvLastName + '<br/>';
          });

        });
      });
    }, err => { alert(err); });




// this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true, false));
// this.lstColumns.push(new VyTableColumn('מחיקה', 'delete', 'html', true, false));
// this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
// this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
// this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
// this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
// this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));
// this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));
// this.lstColumns.push(new VyTableColumn(' משויך לאברך','nvAvrechName','html'));
    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('מחיקה', 'delete', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));
    this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));
    this.lstColumns.push(new VyTableColumn(' משויך לאברך', 'nvAvrechName', 'html'));

<<<<<<< HEAD
  }

  lstDataRows
  vyTableComponent
  
editStudent(e) {
  this.router.navigate(['students/student/' + e.iPersonId + '/' + 'student-details']);
}

deleteStudent(e) {
  this.appProxy.post('DeleteStudent', { iPersonId: e.iPersonId, iUserId: this.globalService.getUser()['iUserId'] }).then(res => {
    if (res == true) {
      alert('נמחק בהצלחה!');
       this.lstDataRows.splice(this.lstDataRows.indexOf(e),1);
      this.vyTableComponent.refreshTable(this.lstDataRows);
    }
    else {
      alert('לא נמחק!');
    }
  });
}

click(e) {
  // this.avrechId = e.iPersonId;
  if (e.columnClickName == "edit")
    this.editStudent(e);
  else
    this.deleteStudent(e);

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
=======


  }


  editAndDeleteStudent(e) {
    debugger;
    if (e.columnClickName == 'edit')
      this.router.navigate(['students/student/' + e.iPersonId + '/' + 'student-details']);
    else {
      // this.alert = confirm("האם אתה בטוח שברצונך למחוק תלמיד זה?");
      // if (this.alert == true) {
      //   this.appProxy.post("DeleteStudent", { iStudent: e.iPersonId, iUserId: this.globalService.getUser() });

      // }
      this.message = 'האם אתה בטוח שברצונך למחוק את ' + e.nvFirstName + ' ' + e.nvLastName + '?';
      //alert(e.nvFirstName);
      this.studentId = e.iPersonId;
      this.flagDelete = true;
    }
  }
  
>>>>>>> 536dc29d8e3ee6b609be78b697514fd4fd5cbb2b

  deleteStudent() {
    this.appProxy.post("DeleteStudent", { iStudent: this.studentId, iUserId: this.globalService.getUser() }).then(res => {
      if (res == true)
        this._parent.openMessagePopup('התלמיד נמחק בהצלחה!');
    });

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
    debugger;
    this.students.downloadExcel();
  }
  tableToPdf(name: string) {
    this.students.downloadPdf(name, 'pdf');
  }
}
