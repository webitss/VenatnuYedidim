import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  flag: boolean;

  constructor(private appProxy: AppProxy, private router: Router, private route: ActivatedRoute, private globalService: GlobalService) { }
  param: any;
  id: number;
  studentList: Student[];
  yeshivaListOfStudent: Yeshiva[];
  avrechimListOfStudent: Avrech[]
  private alert: any;
  @ViewChild('students') students: any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  ngOnInit() {



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




    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('מחיקה', 'delete', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));
    this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));
    this.lstColumns.push(new VyTableColumn(' משויך לאברך', 'nvAvrechName', 'html'));

  }


  editAndDeleteStudent(e) {
    debugger;
    if (e.columnClickName == 'edit')
      this.router.navigate(['students/student/' + e.iPersonId + '/' + 'student-details']);
    else {
      this.alert = confirm("האם אתה בטוח שברצונך למחוק תלמיד זה?");
      if (this.alert == true) {
      this.appProxy.post("DeleteStudent",{iStudent:e.iPersonId,iUserId:this.globalService.getUser()});

      }
    }
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
