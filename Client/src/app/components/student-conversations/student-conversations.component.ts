import { Component, OnInit, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';

import { StudentConversationDetailsComponent } from '../student-conversation-details/student-conversation-details.component';

@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {

  protected iPersonId: number = 9;
  protected conversationsList: Array<Conversation> = new Array<Conversation>();
  protected conversationSelect: Conversation;
  constructor(private appProxy: AppProxy) { }

  // newConversation() {
  //   this.conversationSelect = new Conversation();
  // }


  deleteConversation(iConversationId: number, iUserId: number) {
    this.appProxy.post("DeleteConversations", { iConversationId: iConversationId, iUserId: 1 })
      .then(
        data => {
          this.conversationsList = data;
          alert("sucsses");
        }).catch(err => {
          alert(err);
        });
  }

  ngOnInit() {
    this.appProxy.post("GetConversations", { iPersonId:this.iPersonId})
      .then(
        data => {
          this.conversationsList = data as (Array<Conversation>);
          //alert(this.conversationsList[0].iPersonId );
        });
  }



}
