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
import { Conversation } from '../../classes/conversation';
import { Meeting } from '../../classes/meeting';
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
 studentName:string;
 conversation=new Conversation();
 meeting=new Meeting();

  constructor(@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent,private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService, private router: Router,  private cdRef: ChangeDetectorRef, private route: ActivatedRoute) { 

  }

  minutes: string;
  hours: string;

  personId: number;
  student: Student;
  isNew: boolean = false;
  studentsList:Student[];
  ngOnInit() {
    debugger;
    this.currentTask = Object.assign({}, this.task);

    debugger;
    if (!this.task ) {
      this.task = new Task();
      this.isNew = true;

    }
   

    this.route.parent.params.subscribe(params => {
      this.personId = +params['iPersonId'];
// alert(this.personId);
      this.sysTableService.getValues(SysTableService.dataTables.Task.iSysTableId).then(data => {
        this.taskTypeList = data;
        this.currentTask['dtDate'] = this.task.dtTaskdatetime;
        this.currentTask['dtHour'] =moment(this.task.dtTaskdatetime).format('HH:mm'); //this.hours + ':' + this.minutes;
        
       
        this.appProxy.post('GetStudentsByAvrechId',{ iAvrechId: this.personId}).then(data => { 

          if(data)
          this.studentsList = data; 
        })

  
        if (this.isNew == true) {
          this.task.iTaskType =this.taskTypeList[0].iSysTableRowId;
          if (this.router.url == "/avrechim/avrech/" + this.personId + "/avrech-diary")//אברכים->יומן
          {
            this.task.nvComments =""
            this.task.iPersonId = this.personId;//מי שלחצו עליו
          }
          else {
            // alert(this.personId);
            this.appProxy.post('GetStudentById', { iPersonId: this.personId }).then(data => {
              if (data) {
                debugger;
                this.student = data;
                // alert(this.student.nvFirstName);
                if (this.router.url == "/students/student/" + this.personId + "/student-meetings")//תלמידים ->פגישות
                {
                  this.task.nvComments = "";
                  this.task.iPersonId = this.globalService.getUser().iPersonId;//משתמש
                  debugger;
                  // this.studentName=this.student.nvFirstName+" "+this.student.nvLastName;
                }
                else
                  if (this.router.url == "/students/student/" + this.personId + "/student-conversations")//תלמידים ->שיחות
                  {
                    this.task.nvComments = "";
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
  // selectStudent(event: any) {
  //   debugger;
  //   this.studentsList.forEach(e => {
  //     if (e.iPersonId == parseInt(event.currentTarget.value) ) {
  //       debugger;
  //       this.studentSelected=new Student();
  //       this.studentSelected.nvFirstName = e.nvFirstName;
  //       this.studentSelected.nvLastName=e.nvLastName;
  //       this.studentSelected.iPersonId = e.iPersonId;
  //     }
  //   })


  // }

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() refresh = new EventEmitter();

  // @Output() refresh:EventEmitter<any>= new EventEmitter<any>();
  // addOrEdit:boolean=false;
  saveTask():Promise<boolean> {
  
    this.task.dtTaskdatetime = new Date(this.currentTask['dtDate'] + ' ' + this.currentTask['dtHour']);
    //    if (this.currentTask.iTaskId == 0)
    if(this.task.iTaskType==73)
    {
      this.conversation.iAvrechId=this.task.iPersonId;
      this.conversation.iPersonId=this.task.iStudentId;
      this.conversation.dtConversationDate=this.task.dtTaskdatetime;    
          this.appProxy.post('SetConversations',{conversation:this.conversation,iUserId:this.globalService.getUser()['iUserId']}).then(data=>{
            alert(data);
          })

    }
    else 
       if(this.task.iTaskType==75)
       {
         this.meeting.iMeetingId=0;
         this.meeting.iPersonId=this.task.iStudentId;
         this.meeting.iAvrechId=this.task.iPersonId;
         this.meeting.dtMeetingDate=this.task.dtTaskdatetime;
         this.meeting.iMeetingType=107;
         this.appProxy.post('SetMeeting',{meeting:this.meeting,iUserId:this.globalService.getUser()['iUserId']}).then(data=>{
           alert(data);
         })
       }
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


