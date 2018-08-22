import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableRow } from '../../classes/SysTableRow';
import { Task } from '../../classes/task';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-student-conversation-details',
  templateUrl: './student-conversation-details.component.html',
  styleUrls: ['./student-conversation-details.component.css']
})
export class StudentConversationDetailsComponent implements OnInit {
  private sub: any;
  @Output()
  Conversation = new EventEmitter();
  typeTask: Task;
  @Input()
  protected conversation: Conversation;
  @Input()
  protected sysTableList: SysTableRow[];
<<<<<<< HEAD
  @Output()
  protected newConver= new EventEmitter();
  // @Input()
  // protected newConver :Conversation;
=======

  @ViewChild('task') TaskComponent:TaskComponent;

>>>>>>> 7b464cdbe7f5af617d57c30414e811fc0f3b48ff

  protected iPersonId: number = 1;

  constructor(private route: ActivatedRoute, private appProxy: AppProxy) { }

  cancel() {
    this.Conversation.emit(null);
  }


  saveConversation() {
    this.conversation.dConversationDate = new Date(this.conversation.dConversationDate);
    this.conversation.dtConversationTime = new Date(this.conversation.dtConversationTime);
    this.conversation.dtNextConversationDate = new Date(this.conversation.dtNextConversationDate);
    if (this.conversation.iConversationId == null) {
      this.conversation.iPersonId = 7;
    }
    this.appProxy.post("SetConversations", { conversation: this.conversation, iPersonId: this.iPersonId })
      .then(
        data => {
          if (this.conversation.iConversationId == null) {
            this.Conversation.emit(data);
            // this.newConver.push({
            //   iConversationId: data.iConversationId,
            //   iPersonId: data.iPersonId,
            //   iConversationType: this.sysTableList.filter(s => s.iSysTableRowId == data.iConversationType)[0],
            //   dConversationDate: data.dConversationDate,
            //   dtConversationTime: data.dtConversationTime,
            //   nvConversationSummary: data.nvConversationSummary,
            //   dtNextConversationDate: data.dtNextConversationDate
            // });
            //this.conversation=this.newConver;
          }
          else {
            this.conversation['nvConversationDate'] = this.conversation.dConversationDate.toLocaleDateString();
            this.conversation['nvConversationTime'] = this.conversation.dtConversationTime.toLocaleTimeString();
            this.conversation['nvNextConversationDate'] = this.conversation.dtNextConversationDate.toLocaleDateString();
            this.conversation['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == this.conversation.iConversationType)[0].nvValue;
          }
          if (data) {
            alert("good");
            this.Conversation.emit(null);
          }
          else
            alert("no good");
        });
<<<<<<< HEAD
  }
=======
        this.TaskComponent.saveTask();
}



>>>>>>> 7b464cdbe7f5af617d57c30414e811fc0f3b48ff

  ngOnInit() {
    if (this.conversation == null)
      this.conversation = new Conversation();
    // this.sub=this.route.params.subscribe(params=>{
    //   this.iconversationId=+params['conversationId'];
    // });

  }
  //  ngOnDestroy() {
  //    this.sub.unsubscribe();
  //    }

}