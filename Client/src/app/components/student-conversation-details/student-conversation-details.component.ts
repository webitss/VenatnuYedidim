import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableRow } from '../../classes/SysTableRow';
import { Task } from '../../classes/task';
import { TaskComponent } from '../task/task.component';
import { GlobalService } from '../../services/global.service';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-student-conversation-details',
  templateUrl: './student-conversation-details.component.html',
  styleUrls: ['./student-conversation-details.component.css']
})
export class StudentConversationDetailsComponent implements OnInit {
  private sub: any;
  protected iUserId: number;
  protected iPersonId: number;
  @Output()
  Conversation = new EventEmitter();
  typeTask: Task;
  @Input()
  public conversation: Conversation;
  public currentConver: Conversation;
  @Input()
  public sysTableList: SysTableRow[];

  @Output()
  protected updateConver = new EventEmitter();
  @Output()
  protected saveNewConver = new EventEmitter();
  // @Input()
  // protected newConver :Conversation;
  hours: string;
  minutes: string;
  date: string;
  taskSelect: boolean = false;

  @ViewChild('task') TaskComponent: TaskComponent;

 // this.currentMeeting.dtMeetingDate = new Date(this.currentMeeting['dtDate']this.currentMeeting['dtHour']);
  //protected iPersonId: number = 1;

  constructor(private route: ActivatedRoute, private appProxy: AppProxy, private globalService: GlobalService
    ,@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  cancel() {
    this.Conversation.emit(null);
  }

  conver = new Conversation();
  saveConversation() {
    this.conver.iPersonId = this.conversation.iPersonId;
    this.conver.iConversationId = this.conversation.iConversationId;
    this.conver.iConversationType = this.conversation.iConversationType;
    this.conver.nvConversationSummary = this.currentConver.nvConversationSummary;
    //if(this.conver.iConversationId)
    this.conver.dtConversationDate = new Date(this.currentConver['dtDate'] + ' ' + this.currentConver['conversationTime']);
    if (this.currentConver.iConversationId == null) {
      this.conver.iPersonId = this.iPersonId;
    }
    this.appProxy.post("SetConversations", { conversation: this.conver, iUserId: this.iUserId })
      .then(data => {
        if (data != 0) {
          if (this.conver.iConversationId == null) {
            this.conver.iConversationId = data;
            this.saveNewConver.emit(this.conver);
          }
       
        else
          this.updateConver.emit(this.conver);
 }
        //this.newConver.emit(this.conver);
        if (data) {


          //this._parent.openMessagePopup('')


          alert("השמירה בוצעה בהצלחה");
          this.Conversation.emit(null);
        }
        else
        alert("השמירה נכשלה");
      });

  }

  //איפה למקם?
  //this.TaskComponent.saveTask();




  reset() {

    this.currentConver.dtConversationDate.setDate(null);
    //this.currentConver.dtConversationTime.setTime(null);
    //this.currentConver.dtNextConversationDate.setDate(null);
  }



  ngOnInit() {
    this.iUserId = this.globalService.getUser()['iUserId'];
    this.sub = this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId']
      this.currentConver = new Conversation();
      this.currentConver = Object.assign({}, this.conversation);
      // this.sub=this.route.params.subscribe(params=>{
      //   this.iconversationId=+params['conversationId'];
      // });
      if (this.currentConver.iConversationId != null) {
        this.currentConver['dtDate'] = new Date(this.currentConver.dtConversationDate);
        this.date = this.currentConver.dtConversationDate.toLocaleString();

        this.currentConver['conversationDate'] = this.date;

        //this.currentConver['dtHour'] = new Date((this.currentConver.dtConversationTime).getHours()) + ':'+new Date((this.currentConver.dtConversationTime).getMinutes());
        if ((this.currentConver.dtConversationDate).getMinutes() < 10)
          this.minutes = '0' + (this.currentConver.dtConversationDate).getMinutes().toString();
        else
          this.minutes = (this.currentConver.dtConversationDate).getMinutes().toString();

        if ((this.currentConver.dtConversationDate).getHours() < 10)
          this.hours = '0' + (this.currentConver.dtConversationDate).getHours().toString();
        else
          this.hours = (this.currentConver.dtConversationDate).getHours().toString();

        //this.currentConver['nextConversationDate'] = new Date((this.currentConver.dtNextConversationDate).getTime());
        // if ((this.currentConver.dtNextConversationDate).getMinutes() < 10)
        //   this.minutes = '0' + (this.currentConver.dtNextConversationDate).getMinutes().toString();
        // else
        //   this.minutes = (this.currentConver.dtNextConversationDate).getMinutes().toString();

        // if ((this.currentConver.dtNextConversationDate).getHours() < 10)
        //   this.hours = '0' + (this.currentConver.dtNextConversationDate).getHours().toString();
        // else
        //   this.hours = (this.currentConver.dtNextConversationDate).getHours().toString();
        // this.currentConver['nextConversationDate'] = new Date((this.currentConver.dtNextConversationDate).getTime()) + this.hours + ':' + this.minutes;
        this.currentConver['conversationTime'] = this.hours + ':' + this.minutes;
        //  ngOnDestroy() {
        //    this.sub.unsubscribe();
        //    }
      }
    })
  }


}
