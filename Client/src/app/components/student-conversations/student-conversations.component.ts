import { Component, OnInit, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import {Conversation} from '../../classes/conversation';

import {StudentConversationDetailsComponent} from '../student-conversation-details/student-conversation-details.component';

@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {
  
  id:number=1;
  conversations:Conversation[];
  conversationId:number;
  constructor(private appProxy:AppProxy) { }
  deleteConversation(iConversationId:number,iUserId:number)
  {
    this.appProxy.post("DeleteConversations",{iConversationId:iConversationId,iUserId:iUserId})
    .then(
      data=>{
        this.conversations=data;
        alert("sucsses");
      }).catch(err=>{
      alert(err);
      });
  }  


  ngOnInit() {
  this.appProxy.post("GetConversations",{iPersonId:this.id})
  .then(
    data=>{
      this.conversations=data;
      alert("good");
    }).catch(err=>{
    alert(err);
    });
  }
  
   

}
