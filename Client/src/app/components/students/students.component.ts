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

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  flag:boolean;

  constructor(private appProxy: AppProxy, private router: Router,private route: ActivatedRoute,private globalService:GlobalService ) { }
  param:any;
  id: number;
  studentList: Student[];
  @ViewChild('students') students:any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  ngOnInit() {

    
  
    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 :  this.globalService.getUser().iPersonId;

    this.appProxy.post('GetStudentList', { iUserId: this.id }).then(data => {
      this.studentList = data;

      this.studentList.forEach(
        st => {
           st['edit'] = '<div class="edit"></div>'; 
          })
    }, err => { alert(err); });


    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true,false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));
    this.lstColumns.push(new VyTableColumn('מוסד לימודים', 'nvYeshivaName'));

  
  }


  editStudent(e) {
    this.router.navigate(['students/student/'+e.iPersonId+'/'+'student-details']);
  }
  cardsUnion()
  {
    this.flag==true
    // const modalRef = this.modalService.open(CardsUnionComponent);
  
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }
  // clickCell:true,
  // type: 'html'


  downloadExcel(){
    debugger;
    this.students.downloadExcel();
  }
  tableToPdf(name:string){
    this.students.downloadPdf(name,'pdf');
      }
}
