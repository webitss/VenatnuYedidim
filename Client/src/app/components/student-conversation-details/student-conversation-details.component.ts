import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableRow } from '../../classes/SysTableRow';
import { Task } from '../../classes/task';
import { TaskComponent } from '../task/task.component';
import { GlobalService } from '../../services/global.service';
import { AppComponent } from '../app/app.component';
import * as moment from 'moment';
import { Avrech } from '../../classes/avrech';
import { Meeting } from '../../classes/meeting';
@Component({
  selector: 'app-student-conversation-details',
  templateUrl: './student-conversation-details.component.html',
  styleUrls: ['./student-conversation-details.component.css']
})
export class StudentConversationDetailsComponent implements OnInit {
  private sub: any;
  protected iUserId: number;
  protected iPersonId: number;
  public avrechByStuden:Avrech=new Avrech();
  currentMeeting: Meeting;
  addTask:string;
  @Output()
  Conversation = new EventEmitter();
  typeTask: Task;
  @Input()
  public conversation: Conversation;
  public currentConver: Conversation;
  @Input()
  @Input()
  task:Task;
  @Input()
  public sysTableList: SysTableRow[];
  public currentComponent: any;
  @Input()
  public flagCome:boolean;
avrech:Avrech;
  // @Output()
  // onSaveTask:EventEmitter<Task>=new EventEmitter<Task>();
  @Output() refresh = new EventEmitter();

  @Output()
  protected updateConver = new EventEmitter();
  @Output()
  protected saveNewConver = new EventEmitter();
  // @Input()
  // protected newConver :Conversation;
 
  taskSelect: boolean = false;
  @ViewChild(TaskComponent) child: TaskComponent;

  @ViewChild('task') TaskComponent: TaskComponent;

  // this.currentMeeting.dtMeetingDate = new Date(this.currentMeeting['dtDate']this.currentMeeting['dtHour']);
  //protected iPersonId: number = 1;

  constructor(private route: ActivatedRoute, private appProxy: AppProxy, private globalService: GlobalService
    , @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  ngOnInit() {
    debugger;
    this.currentMeeting=new Meeting();
    // this.sub = this.route.parent.params.subscribe(params => {
    //   this.iPersonId = +params['iPersonId']; // (+) converts string 'id' to a number
    
    // });

    this.addTask="הוספת";

    this.iUserId = this.globalService.getUser()['iUserId'];
    // this.sysTableList=thi
    this.sub = this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId']
      this.currentConver = Object.assign({}, this.conversation);
      if (this.currentConver.iConversationId == null) {
        this.conversation.iConversationType = this.sysTableList && this.sysTableList[0] ? this.sysTableList[0].iSysTableRowId : null;
        this.currentConver = new Conversation();    
        this.appProxy.post("GetAllAvrechimByStudent", { iPersonId:this.iPersonId }).then(
      data => {
        debugger;
        this.avrechByStuden = data; 
         this.currentConver.iAvrechId=this.avrechByStuden.iPersonId;
         debugger;
         this.currentConver['avrechName']= this.avrechByStuden.nvFirstName+' '+this.avrechByStuden.nvLastName;
      
      },
    );
      }
      else
      if(this.flagCome)
      {
        this.avrech=this.globalService.getAvrech()
        this.currentConver['avrechName']=this.avrech.nvFirstName+' '+this.avrech.nvLastName;
      this.conver.iAvrechId=this.avrech.iPersonId;
      }
      this.currentConver['dtDate'] = new Date(this.currentConver.dtConversationDate);
      this.currentConver['conversationTime'] =moment(this.currentConver.dtConversationDate).format('HH:mm');
    })

  }
  cancel() {
    this.Conversation.emit(null);
  }

  onRouterOutletActivate(event) {
    debugger;
    this.currentComponent = event;
  }


  conver = new Conversation();
  saveConversation() {
    debugger;
    this.conver.iPersonId = this.conversation.iPersonId;
    this.conver.iConversationId = this.conversation.iConversationId;
    this.conver.iConversationType = this.conversation.iConversationType;
    this.conver.nvConversationSummary = this.currentConver.nvConversationSummary;
    this.conver.iAvrechId=this.currentConver.iAvrechId;
    // this.onSaveTask.emit(this.task);
    //if(this.conver.iConversationId)
    this.conver.dtConversationDate = new Date(this.currentConver['dtDate'] + ' ' + this.currentConver['conversationTime']);
    if (this.currentConver.iConversationId == null) {
      this.conver.iPersonId = this.iPersonId;
    }
    this.appProxy.post("SetConversations", { conversation: this.conver,task:this.task, iUserId: this.iUserId })
      .then(data => {
          if (data) {
            if (data != 0) {
          if (this.conver.iConversationId == null) {
            this.conver.iConversationId = data;
            this.saveNewConver.emit(this.conver);
          }

          else
          {
            if(this.flagCome)
            this.refresh.emit(this.conver)
            else
            this.updateConver.emit(this.conver);
          }
            
        }
          this._parent.openMessagePopup("השמירה בוצעה בהצלחה!");
          this.Conversation.emit(null);
          
      }
        else
          this._parent.openMessagePopup("השמירה נכשלה");
      });
      debugger;
      if (this.conver.iConversationId == null)
this.child.saveTask(false,this.conver.iAvrechId,this.conver.iPersonId);
      
  }

  //איפה למקם?
  //this.TaskComponent.saveTask();



  change()
  {
    if(this.addTask=="הוספת")
    this.addTask="הסר";
    else
    this.addTask="הוספת";
    // alert("come");
    // debugger;
    // this.currentComponent = event;
  }
  reset() {

    this.currentConver.dtConversationDate.setDate(null);
    //this.currentConver.dtConversationTime.setTime(null);
    //this.currentConver.dtNextConversationDate.setDate(null);
  }






}
