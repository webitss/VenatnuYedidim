import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';

@Component({
  selector: 'app-student-conversation',
  templateUrl: './student-conversation.component.html',
  styleUrls: ['./student-conversation.component.css']
})
export class StudentConversationComponent implements OnInit {
conversation:Conversation;
  constructor(private appProxy:AppProxy) { }

  deleteConversation(iConversationId:number,iUserId:number)
  {
    this.appProxy.post("DeleteConversations",{iConversationId:iConversationId,iUserId:iUserId})
    .then(
      data=>{
        this.conversation=data;
        alert("sucsses");
      }).catch(err=>{
      alert(err);
      });
  }  


  ngOnInit() {
  }

}
