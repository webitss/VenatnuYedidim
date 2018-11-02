import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private router: Router, private route: ActivatedRoute, private appProxy: AppProxy, private sysTableService: SysTableService) { }
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


  save() {
    if (this.currentComponent.saveStudent)
      this.currentComponent.saveStudent();
  }

  close() {
    this.router.navigate(["students"]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}







