import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild,AfterViewChecked, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';
import { AppComponent } from '../app/app.component';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';
import { NgForm } from '@angular/forms';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy,AfterViewInit {
  
  status: string;
  private sub: any;
  flag: number;
  public currentComponent: any;
  student: Student;
  id: number;

  disabled:boolean=false;
  @ViewChild(NgForm) form;
  @ViewChild('students') students: any;
  constructor(private router: Router, private route: ActivatedRoute, 
    private appProxy: AppProxy, private sysTableService: SysTableService,
    private cdRef:ChangeDetectorRef) { }
  // subscription:Subscription;
  ngOnInit() {
debugger;
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
  ngAfterViewInit(): void {
    debugger;
    let changeMe = new CustomEvent("changeButton");

debugger;
alert(this.currentComponent.htm);
this.currentComponent.htm.addEventListener("changeButton",function(e:Event){
    
}.bind(this));

this.currentComponent.dispatchEvent(changeMe);
  }
  // s(){
  //   debugger;
  //   this.currentComponent.changes();
  // }
  // ngOnInit() {
  //   this.sub = this.route.params.subscribe(params => {
  //      this.id = +params['id']; // (+) converts string 'id' to a number

  //      // In a real app: dispatch action to load the details here.
  //   });
  // }


  onRouterOutletActivate(event) {

    this.currentComponent = event;
  }

  isDisabled(): boolean {
    // if (this.currentComponent.form != undefined) {
    //   var f=this.currentComponent.form.valid;

    //   return f;
    // }
    // else
    //   return false;
    return this.currentComponent.form.valid;
  }
  ngAfterViewChecked()
  {

    this.cdRef.detectChanges();
  }
  save() {
   
    if (this.currentComponent.saveStudent)
      this.currentComponent.saveStudent();
  }
  changeButton(){
    debugger;
    this.disabled=true;
  }
ff(){
  alert("hi")
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







