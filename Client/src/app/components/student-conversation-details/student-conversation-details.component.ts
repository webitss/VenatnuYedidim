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

  @ViewChild('task') TaskComponent: TaskComponent;


  protected iPersonId: number = 1;

  constructor(private route: ActivatedRoute, private appProxy: AppProxy, private globalService: GlobalService) { }

  cancel() {
    this.Conversation.emit(null);
  }

  saveConversation() {
    this.currentConver.dConversationDate = new Date(this.conversation.dConversationDate);
    this.currentConver.dtConversationTime = new Date(this.conversation.dtConversationTime);
    this.currentConver.dtNextConversationDate = new Date(this.conversation.dtNextConversationDate);
    if (this.currentConver.iConversationId == null) {
      this.currentConver.iPersonId = 7;
    }
    this.appProxy.post("SetConversations", { conversation: this.currentConver, iUserId: this.iUserId })
      .then(
        data => {

          if (data != 0) {
            if (this.currentConver.iConversationId != null) {
              this.currentConver.iConversationId = data;
              this.newConver.emit(this.currentConver);

            }
          }
          else
            this.UpdateConver.emit(this.currentConver);


<<<<<<< HEAD
// <<<<<<< HEAD
//           alert(data);
//           this.Conversation.emit(null);
//           // this.newConver.push({
//           //   iConversationId: this.conversation.iConversationId,
//           //   iPersonId: this.conversation.iPersonId,
//           //   iConversationType: this.sysTableList.filter(s => s.iSysTableRowId ==  this.conversation.iConversationType)[0],
//           //   dConversationDate:  this.conversation.dConversationDate,
//           //   dtConversationTime:  this.conversation.dtConversationTime,
//           //   nvConversationSummary:  this.conversation.nvConversationSummary,
//           //   dtNextConversationDate: this.conversation.dtNextConversationDate
//           // });
//           // this.conversation=this.newConver;
//           // }
//           // else {
//           //   this.conversation['nvConversationDate'] = this.conversation.dConversationDate.toLocaleDateString();
//           //   this.conversation['nvConversationTime'] = this.conversation.dtConversationTime.toLocaleTimeString();
//           //   this.conversation['nvNextConversationDate'] = this.conversation.dtNextConversationDate.toLocaleDateString();
//           //   this.conversation['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == this.conversation.iConversationType)[0].nvValue;
//           // }
//           // if (data) {
//           //   alert("good");
//           //   this.Conversation.emit(null);
//           // }
//           // else
//           //   alert("no good");
// =======
//           this.newConver.emit(this.conversation);
//           if (data) {
//             alert("good");
//             this.Conversation.emit(null);
//           }
//           else
//             alert("no good");
// >>>>>>> 17ff4bc1e58a547fa818ac6d80fb2905c84252ae
=======
          this.newConver.emit(this.conversation);
          if (data) {
            alert("good");
            this.Conversation.emit(null);
          }
          else
            alert("no good");
>>>>>>> 684a3b3ca2d7862de5e022acfa38a4820fe9b146
        });
  }

  //איפה למקם?
  //this.TaskComponent.saveTask();




  reset() {

    this.currentConver.dConversationDate.setDate(null);
    this.currentConver.dtConversationTime.setTime(null);
    this.currentConver.dtNextConversationDate.setDate(null);
  }



  ngOnInit() {
    this.iUserId = this.globalService.getUser()['iUserId'];
    this.currentConver = new Conversation();
    this.currentConver = Object.assign({}, this.conversation);
    // this.sub=this.route.params.subscribe(params=>{
    //   this.iconversationId=+params['conversationId'];
    // });
    if (this.currentConver.iConversationId != null) {

      this.conversation['conversationDate'] = new Date((this.currentConver.dConversationDate).getTime());

      //this.currentConver['dtHour'] = new Date((this.currentConver.dtConversationTime).getHours()) + ':'+new Date((this.currentConver.dtConversationTime).getMinutes());
      if ((this.currentConver.dtConversationTime).getMinutes() < 10)
        this.minutes = '0' + (this.currentConver.dtConversationTime).getMinutes().toString();
      else
        this.minutes = (this.currentConver.dtConversationTime).getMinutes().toString();

      if ((this.currentConver.dtConversationTime).getHours() < 10)
        this.hours = '0' + (this.currentConver.dtConversationTime).getHours().toString();
      else
        this.hours = (this.currentConver.dtConversationTime).getHours().toString();

      //this.currentConver['nextConversationDate'] = new Date((this.currentConver.dtNextConversationDate).getTime());
      if ((this.currentConver.dtNextConversationDate).getMinutes() < 10)
        this.minutes = '0' + (this.currentConver.dtNextConversationDate).getMinutes().toString();
      else
        this.minutes = (this.currentConver.dtNextConversationDate).getMinutes().toString();

      if ((this.currentConver.dtNextConversationDate).getHours() < 10)
        this.hours = '0' + (this.currentConver.dtNextConversationDate).getHours().toString();
      else
        this.hours = (this.currentConver.dtNextConversationDate).getHours().toString();
      this.currentConver['nextConversationDate'] = new Date((this.currentConver.dtNextConversationDate).getTime()) + this.hours + ':' + this.minutes;
      this.currentConver['conversationTime'] = this.hours + ':' + this.minutes;
      //  ngOnDestroy() {
      //    this.sub.unsubscribe();
      //    }
    }
  }
}
