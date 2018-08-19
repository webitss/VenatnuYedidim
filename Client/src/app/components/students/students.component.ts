import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router, ActivatedRoute } from '@angular/router';
// import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardsUnionComponent } from '../cards-union/cards-union.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  // 
  constructor(private appProxy: AppProxy, private router: Router,private route: ActivatedRoute ) { }
  param:any;
  id: number;
  studentList: Student[];

  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  ngOnInit() {

    
  
    this.id = 0;

    this.appProxy.post('GetStudentList', { iUserId: this.id }).then(data => {
      this.studentList = data;

      this.studentList.forEach(
        st => {
           st['edit'] = '<div class="edit"></div>'; 
          })
    }, err => { alert(err); });


    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true));
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
    // const modalRef = this.modalService.open(CardsUnionComponent);
  
    // modalRef.result.then((result) => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }
  // clickCell:true,
  // type: 'html'










}
