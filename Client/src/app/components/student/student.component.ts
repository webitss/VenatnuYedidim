import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { AppComponent } from '../app/app.component';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  status: string;
  private sub: any;
  flag: number;
  public currentComponent: any;
  student: Student;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private appProxy: AppProxy, private sysTableService: SysTableService,private cdRef:ChangeDetectorRef) { }
  // subscription:Subscription;
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.flag = +params['iPersonId'];
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['iPersonId'];


      if (this.id != 0) {


        this.appProxy.post("GetStudentById", { iPersonId: this.id }).then(data => {
          this.student = data;
          this.sysTableService.getValues(SysTableService.dataTables.participationType.iSysTableId).then(data => {
            this.status = data.filter(x => x.iSysTableRowId == this.student.iStatusType)[0].nvValue;
            //alert(this.status);
          });
        })
      }
    });


  };
  // ngOnInit() {
  //   this.sub = this.route.params.subscribe(params => {
  //      this.id = +params['id']; // (+) converts string 'id' to a number

  //      // In a real app: dispatch action to load the details here.
  //   });
  // }


  onRouterOutletActivate(event) {

    this.currentComponent = event;
  }

  get isDisabled(): boolean {
    if (this.currentComponent.form != undefined) {
      var f=this.currentComponent.form.valid;
debugger;
      return f;
    }
    else
      return false;
  }
  ngAfterViewChecked()
  {

    this.cdRef.detectChanges();
  }
  save() {
   
    if (this.currentComponent.saveStudent)
      this.currentComponent.saveStudent();
  }

  close() {
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}







