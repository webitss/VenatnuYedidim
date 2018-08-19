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
          if (data) {
            alert("good");
            this.Conversation.emit(null);
          }
          else
            alert("no good");
        });
}




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