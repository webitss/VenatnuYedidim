import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, Inject, forwardRef } from '@angular/core';
import { Task } from "../../classes/task"
import { SysTableService } from '../../services/sys-table.service';
import { AppProxy } from '../../services/app.proxy';
import { GlobalService } from '../../services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../classes/student';
import { AvrechDiaryComponent } from "../../components/avrech-diary/avrech-diary.component"
import { CalendarComponent } from '../calendar/calendar.component';
// import { moment } from '../../../../node_modules/ngx-bootstrap/chronos/test/chain';
import { promise } from '../../../../node_modules/protractor';
import * as moment from 'moment';
import { AppComponent } from '../app/app.component';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  @Output()
  taskTypeList: Array<any>;
  @Output()
  @Input()
  task: Task;
  currentTask: Task = new Task();
  selectType: string;
  type: Task;
  iuserid: number;
 studentSelected:Student;

  constructor(@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent,private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService, private router: Router,  private cdRef: ChangeDetectorRef, private route: ActivatedRoute) { 

  }

  minutes: string;
  hours: string;

  personId: number;
  student: Student;
  isNew: boolean = false;
  studentsList:Student[];
  ngOnInit() {
    this.currentTask = Object.assign({}, this.task);
    if (!this.task ) {
      this.task = new Task();
      this.isNew = true;

    }
   

    this.route.parent.params.subscribe(params => {
      this.personId = +params['iPersonId'];

      this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
        this.taskTypeList = data;
        this.currentTask['dtDate'] = this.task.dtTaskdatetime;
        this.currentTask['dtHour'] =moment(this.task.dtTaskdatetime).format('HH:mm'); //this.hours + ':' + this.minutes;
        
       
        this.appProxy.post('GetStudentsByAvrechId',{ iAvrechId: this.personId}).then(data => { 
          debugger;
          if(data)
          this.studentsList = data; 
        })
  
  
        if (this.isNew == true) {
          this.task.iTaskType =this.taskTypeList[0].iSysTableRowId;
          if (this.router.url == "/avrechim/avrech/" + this.personId + "/avrech-diary")//אברכים->יומן
          {
            this.task.nvComments = " עם התלמיד: "
            this.task.iPersonId = this.personId;//מי שלחצו עליו
          }
          else {
            // alert(this.personId);
            this.appProxy.post('GetStudentById', { iUserId: this.personId }).then(data => {
              if (data) {
                this.student = data;
                if (this.router.url == "/students/student/" + this.personId + "/student-meetings")//תלמידים ->פגישות
                {
                  this.task.nvComments = " פגישה עם התלמיד: " + this.student.nvFirstName + " " + this.student.nvLastName;//מי שלחצו עליו
                  this.task.iPersonId = this.globalService.getUser().iPersonId;//משתמש
    
                }
                else
                  if (this.router.url == "/students/student/" + this.personId + "/student-conversations")//תלמידים ->שיחות
                  {
                    this.task.nvComments = " שיחה עם התלמיד: " + this.student.nvFirstName + " " + this.student.nvLastName;//מי שלחצו עליו
                    this.task.iPersonId = this.globalService.getUser().iPersonId;//משתמש
                  }
    
              }
              else
                this._parent.openMessagePopup("שגיאה בשליפת הנתונים");
    
            });
          }
        }
        this.cdRef.detectChanges();
      });
    });
    

  }
  selectAv(event: any) {
    debugger;
    this.studentsList.forEach(e => {
      if (e.nvFirstName+" "+e.nvLastName == event.currentTarget.value) {
        debugger;
        this.studentSelected=new Student();
        this.studentSelected.nvFirstName = e.nvFirstName;
        this.studentSelected.iPersonId = e.iPersonId;
      }
    })
    debugger;
  }
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() refresh = new EventEmitter();

  // @Output() refresh:EventEmitter<any>= new EventEmitter<any>();
  // addOrEdit:boolean=false;
  saveTask():Promise<boolean> {
    this.task.dtTaskdatetime = new Date(this.currentTask['dtDate'] + ' ' + this.currentTask['dtHour']);
    //    if (this.currentTask.iTaskId == 0)
    return this.appProxy.post('SetTask', { task: this.task, iUserId: this.globalService.getUser()['iUserId'] }).then(data => {
      if (data) {
        this._parent.openMessagePopup("השמירה התבצעה בהצלחה!");
        this.refresh.emit(this.task);
        this.close.emit();
        return Promise.resolve(true);
        //close
      }
    }, err => {
      return Promise.resolve(false);
      
    });

  }

}


