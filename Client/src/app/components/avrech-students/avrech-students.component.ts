import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { T2Int } from '../../classes/T2Int';

@Component({
  selector: 'app-avrech-students',
  templateUrl: './avrech-students.component.html',
  styleUrls: ['./avrech-students.component.css']
})
export class AvrechStudentsComponent implements OnInit {
  @Output()
  flag: boolean = false;
  id: number;
  students: Student[];
  allStudents: Array<Student>;
  fields: Array<string>;
  studentsToAdd: Array<any> = new Array<any>();
  student: Student;
  title:string="רשימת תלמידים"
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
    this.appProxy.post('AddStudentsToAvrech', { studentAndAvrechArr: this.studentAndAvrechArr, iUserId: this.userId }).then(data => { alert(data); }
      , err => alert(err));
    this.flag = false
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    })
    this.appProxy.post('GetAvrechStudents', { iPersonId: this.id }).then(data => this.students = data
      , err => alert(err));

    this.appProxy.post('GetStudentList', { iPersonId: 0 }).then(data => this.allStudents = data
      , err => alert(err));
    this.fields.push("nvLastName");
    this.fields.push("nvLastName");
    this.fields.push("nvIdentityCad");
  }

  deleteStudent(id: number) {
    this.appProxy.post('DeleteAvrechStudent', { iAvrechId: this.id, iStudentId: id }, ).then(data => {
      if (data == true) {
        for (let i = 0; i < this.students.length; i++) {
          if (this.students[i].iPersonId == id)
            this.students.splice(i, 1);
          break;
        }
      }
    }
      , err => alert(err));
  }

}
