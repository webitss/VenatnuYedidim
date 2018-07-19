import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';

@Component({
  selector: 'app-student-conversation-details',
  templateUrl: './student-conversation-details.component.html',
  styleUrls: ['./student-conversation-details.component.css']
})
export class StudentConversationDetailsComponent implements OnInit {
  private sub: any;
  @Input()
  protected iConversationId:number;

  iUserId:number;
  //conversationId:number;
  conversation:Conversation;
  // conversationType:number;
  //   conversationDate:Date;
  //   conversationDateTime:Date;
  //   conversationSummary:string;
  //   NextconversationDate:Date;
  constructor(private route:ActivatedRoute,private appProxy:AppProxy) { }

  addConversation(iConversationId:number)
  {
    if(iConversationId==1){
    this.appProxy.post("AddConversations",{conversation:this.conversation,iUserId:this.iUserId,})
     .then(
    data=>{
      this.conversation=data;
      alert("good");
    }).catch(err=>{
    alert(err);
    });
    }
    
    }   
    


  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.iConversationId=+params['conversationId'];
    });
   }
   ngOnDestroy() {
     this.sub.unsubscribe();
     }
}
