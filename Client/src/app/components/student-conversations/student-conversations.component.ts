import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import {Conversation} from '../../classes/conversation';

@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }
  id:number=1;
  conversations:Conversation[];

  ngOnInit() {
    this.appProxy.post("GetConversations",{iPersonId:this.id});
  }

}
