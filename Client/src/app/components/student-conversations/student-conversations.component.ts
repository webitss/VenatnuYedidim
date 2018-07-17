import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import {Conversation} from '../../classes/conversation';

@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {
  id:number=1;
  conversations:Conversation[];

  constructor(private appProxy:AppProxy) { }
  

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
