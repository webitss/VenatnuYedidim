import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableRow } from '../../classes/SysTableRow';
import { Task } from '../../classes/task';
import { TaskComponent } from '../task/task.component';
import { GlobalService } from '../../services/global.service';

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
  protected conversation: Conversation;
  protected currentConver: Conversation;
  @Input()
  protected sysTableList: SysTableRow[];

  @Output()
  protected UpdateConver = new EventEmitter();
  @Output()
  protected newConver = new EventEmitter();
  // @Input()
  // protected newConver :Conversation;
  hours: string;
  minutes: string;
  date:string;
  taskSelect:boolean=false;

  @ViewChild('task') TaskComponent: TaskComponent;


  //protected iPersonId: number = 1;

  constructor(private route: ActivatedRoute, private appProxy: AppProxy, private globalService: GlobalService) { }

  cancel() {
    this.Conversation.emit(null);
  }

  saveConversation() {
    this.currentConver.dtConversationDate=new Date(this.currentConver.dtConversationDate+' '+this.currentConver['conversationTime']);
    if (this.currentConver.iConversationId == null) {
      this.currentConver.iPersonId = this.iPersonId;
    }
    this.appProxy.post("SetConversations", { conversation: this.currentConver, iUserId: this.iUserId })
      .then(data => {
        if (data != 0) {
          if (this.currentConver.iConversationId == null) {
            this.currentConver.iConversationId = data;
            this.newConver.emit(this.currentConver);

          }
        }
        else
          this.UpdateConver.emit(this.currentConver);



        this.newConver.emit(this.conversation);
        if (data) {
          alert("good");
          this.Conversation.emit(null);
        }
        else
          alert("no good");
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

        this.date=this.currentConver.dtConversationDate.getDate().toLocaleString();
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
