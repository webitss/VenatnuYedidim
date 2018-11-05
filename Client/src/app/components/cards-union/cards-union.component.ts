import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';

@Component({
  selector: 'app-cards-union',
  templateUrl: './cards-union.component.html',
  styleUrls: ['./cards-union.component.css']
})
export class CardsUnionComponent implements OnInit {

  student1: Student;
  student2: Student;
  student: Student = new Student();
  model: number;
  sameNameStudents: boolean = true;



  studentList: Student[];
  students: boolean = false;

  id: number;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy, private globalService: GlobalService) { }

  ngOnInit() {


    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
    this.student.dtAddStudentDate = null;
    this.student.dtBirthdate = null;
    //  this.activatedRoute.parent.params.subscribe(params => {
    //     this.id = params['iPersonId'];
    //   });
    this.appProxy.post('GetStudentList', { iUserId: this.id }).then(
      data => {
        this.studentList = data;
        debugger;
      }
      , err => alert(err));
  }
  student1Change(event: any) {
    this.studentList.forEach(e => {
      if (e.iPersonId == event.currentTarget.value) {
        this.student1 = e;
        if (this.student2 && this.student2.iPersonId == e.iPersonId)
          this.sameNameStudents = false;
        else
          this.sameNameStudents = true;

      }
    });
  }
  student2Change(event: any) {
    this.studentList.forEach(e => {
      if (e.iPersonId == event.currentTarget.value) {
        this.student2 = e;
        if (this.student1 && this.student1.iPersonId == e.iPersonId)
          this.sameNameStudents = false;
        else
          this.sameNameStudents = true;

      }
    });

  }

  get baseFileUrl() {
    return AppProxy.getBaseUrl() + 'Files/';
  }

  unionOk() {

    for (var f in this.student) {
      if (this.student[f] == null)
        this.student[f] = this.student1[f];
    }
    if (this.student.nvMotherDeathDate == "" || this.student.nvMotherDeathDate == undefined)
      this.student.bDeathMother = false;
    else
      this.student.bDeathMother = true;

    if (this.student.nvFatherDeathDate == "")
      this.student.bDeathFather = false;
    else
      this.student.bDeathFather = true;


    this.appProxy.post('UnionCards', { student: this.student, iStudent2: this.student2.iPersonId }).then(
      data => {
        if (data == true) {
          alert("האיחוד התבצע בבהצלחה");
          this.onClose.emit();

        }
        else
          alert("שגיאה באיחוד הכרטיסים")
      }
      , err => alert("שגיאה בגישה לשרת"));
  }

  checkDisabled(field) {
    if (this.student1[field] == this.student2[field])
      return true;
    else
      return false;
  }
  close() {
    this.onClose.emit();
  }


}
