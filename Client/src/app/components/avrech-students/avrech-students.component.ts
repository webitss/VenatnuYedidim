import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { T2Int } from '../../classes/T2Int';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { VyMultySelectComponent } from '../../templates/vy-multy-select/vy-multy-select.component';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

@Component({
  selector: 'app-avrech-students',
  templateUrl: './avrech-students.component.html',
  styleUrls: ['./avrech-students.component.css']
})
export class AvrechStudentsComponent implements OnInit {
  @Output()
  flag: boolean = false;
  id: number;
  // students: Student[];
  allStudents: Array<Student>;
  fields: Array<string>;
  studentsToAdd: Array<any> = new Array<any>();
  student: Student;
  title: string = "רשימת תלמידים";
  inputTitle: string = "בחר תלמידים";

  header = 'מחיקת תלמיד';
  message = 'האם אתה בטוח שברצונך למחוק תלמיד זה?';

  @ViewChild('child') VyMultySelect: VyMultySelectComponent;


  listToSelect: Array<any>;

  //studentList: Student[];

  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy) {

  }

  cancelAdd(event) {
    this.flag = false;
  }

  getFromChild(list: Array<any>) {
    this.studentsToAdd = list;
  }
  //לשלןף מהssesion
  userId: number = 2;
  studentAndAvrechArr: Array<T2Int> = new Array<T2Int>();
  // t2int:T2Int=new T2Int();

  saveAdd() {
    this.studentAndAvrechArr = new Array<T2Int>();
    this.studentsToAdd.forEach(element => {
      this.studentAndAvrechArr.push(new T2Int(this.id, element.iPersonId));
    });
    this.VyMultySelect.save();

    this.appProxy.post('AddStudentsToAvrech', { studentAndAvrechArr: this.studentAndAvrechArr, iUserId: this.userId }).then(data => { });
    this.flag = false
  }
  item: string;
  ngOnInit() {
    this.listToSelect = new Array<any>();

    this.activatedRoute.parent.params.subscribe(params => {


      this.id = params['iPersonId'];
    })
    this.appProxy.post('GetAvrechStudents', { iPersonId: this.id }).then(data =>
      this.allStudents = data
    );

    this.appProxy.post('GetStudentList', { iPersonId: 0 }).then(
      data => {

        this.allStudents = data
        this.allStudents.forEach(
          st => {
            st['delete'] = '<div class="delete"></div>';
          });

        this.allStudents.forEach(
          student => {
            this.listToSelect.push({ value: student.nvFirstName + ' ' + student.nvLastName + " " + student.nvIdentityCard });
          }
        );
      }
    );

    this.lstColumns.push(new VyTableColumn('', 'delete', 'html', true));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));


    // this.fields.push("nvLastName");
    // this.fields.push("nvLastName");
    // this.fields.push("nvIdentityCad");


  }

  studentToDel;
  delFlag;
  del(e) {
    this.delFlag = true;
    this.studentToDel = e;
  }
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  deleteStudent(e: Student) {

    this.appProxy.post('DeleteAvrechStudent', { iAvrechId: this.id, iStudentId: e.iPersonId }).then(data => {
      if (data == true) {
        // for (let i = 0; i < this.allStudents.length; i++) {
        //   if (this.allStudents[i].iPersonId == e.iPersonId)
        //     this.allStudents.splice(i, 1);
        //   break;
        // }
        const i = this.allStudents.find(x => x.iStudentId == e.iStudentId);
        this.allStudents.splice(this.allStudents.indexOf(i), 1);
        this.vyTableComponent.refreshTable(this.allStudents);
      }
    }
    );
  }

}
