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

  protected iPersonId: number = 7;
  protected flag: number;
  protected conversationsList: Array<Conversation> = new Array<Conversation>();
  protected conversationSelect: Conversation;

  @Input()
  public lstColumns = [
    {
      title: 'עריכה',
      name: 'edit',
      bClickCell: true,
      type: 'html'
    },
    {
      title: 'סוג שיחה',
      name: 'iConversationType'
    },
    {
      title: 'תאריך שיחה',
      name: 'dConversationDate'
    },
    {
      title: 'שעת שיחה',
      name: 'dtConversationTime'
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
  public lstDataRows=[];

  constructor(private appProxy: AppProxy) { }

  // newConversation() {
  //   this.conversationSelect = new Conversation();
  // }

  close() {
    this.conversationSelect = null;
  }
  editConversation(conver: Conversation) {
    this.conversationSelect = conver;
    this.flag=1;
  }

  addConversation()
  {
    this.conversationSelect=new Conversation();
  this.conversationSelect.dConversationDate=new Date();
  this.conversationSelect.dtConversationTime=new Date();
  this.conversationSelect.dtNextConversationDate=new Date();
 
  }


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
          data.forEach(c => {
            this.lstDataRows.push(
              {
                iConversationId: c.iConversationId,
                iPersonId: c.iPersonId,
                iConversationType:c.iConversationType,
                dConversationDate: c.dConversationDate.toLocaleDateString(),
                dtConversationTime: c.dtConversationTime.toLocaleTimeString(), 
                dtNextConversationDate: c.dtNextConversationDate.toLocaleDateString(),
                nvConversationSummary: c.nvConversationSummary,
                edit: ' <img src="../../../assets/images/pencil.png" class="img"/>'
               
              });
          });
    
          //alert(this.conversationsList[0].iPersonId );
         
        });
  }



}
