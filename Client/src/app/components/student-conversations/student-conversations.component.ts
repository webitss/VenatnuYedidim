import { Component, OnInit, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';

import { StudentConversationDetailsComponent } from '../student-conversation-details/student-conversation-details.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {

  protected iPersonId: number = 9;
<<<<<<< HEAD

=======
>>>>>>> 8b1d41e892b88552154d5979daf8a2f66ce1634e
  protected conversationsList: Array<Conversation> = new Array<Conversation>();
  protected conversationSelect: Conversation;

  @Input()
  public lstColumns = [
    {
      title: 'סוג שיחה',
      name: 'iConversationType'
    },
    {
      title: 'תאריך שיחה',
      name: 'dConversationDate'
    },
    {
      title: 'סיכום שיחה',
      name: 'nvConversationSummary'
    },
    {
      title: 'תאריך שיחה הבאה',
      name: 'dtNextConversationDate'
    }



  ];


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
    this.appProxy.post("GetConversations", { iPersonId: this.iPersonId })
      .then(
        data => {
          this.conversationsList = data;
          //alert(this.conversationsList[0].iPersonId );
        });
  }



}
