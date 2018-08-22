import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableRow } from '../../classes/SysTableRow';
import { Task } from '../../classes/task';

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

>>>>>>> 42028593fd1e71d823ad0c8dbe7f3ccc47af2ed8

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
         
            this.newConver.emit(null);
            // this.newConver.push({
            //   iConversationId: this.conversation.iConversationId,
            //   iPersonId: this.conversation.iPersonId,
            //   iConversationType: this.sysTableList.filter(s => s.iSysTableRowId ==  this.conversation.iConversationType)[0],
            //   dConversationDate:  this.conversation.dConversationDate,
            //   dtConversationTime:  this.conversation.dtConversationTime,
            //   nvConversationSummary:  this.conversation.nvConversationSummary,
            //   dtNextConversationDate: this.conversation.dtNextConversationDate
            // });
            // this.conversation=this.newConver;
          // }
          // else {
          //   this.conversation['nvConversationDate'] = this.conversation.dConversationDate.toLocaleDateString();
          //   this.conversation['nvConversationTime'] = this.conversation.dtConversationTime.toLocaleTimeString();
          //   this.conversation['nvNextConversationDate'] = this.conversation.dtNextConversationDate.toLocaleDateString();
          //   this.conversation['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == this.conversation.iConversationType)[0].nvValue;
          // }
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



>>>>>>> 42028593fd1e71d823ad0c8dbe7f3ccc47af2ed8

  ngOnInit() {
    if (this.conversation == null)
      this.conversation = new Conversation();
    // this.sub=this.route.params.subscribe(params=>{
    //   this.iconversationId=+params['conversationId'];
    // });
    this.conversation['nvConversationDate'] = new Date((this.conversation.dConversationDate).getTime());

    // this.meeting['dtHour'] = new Date((this.meeting.dtMeetingDate).getHours()) + ':'+new Date((this.meeting.dtMeetingDate).getMinutes());
if((this.conversation.dtConversationTime).getMinutes() <10)
    this.conversation['nvConversationTime'] = (this.conversation.dtConversationTime).getHours() + ':'+'0'+(this.conversation.dtConversationTime).getMinutes();

  }
  //  ngOnDestroy() {
  //    this.sub.unsubscribe();
  //    }

}