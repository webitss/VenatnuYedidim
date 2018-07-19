import { Data } from "@angular/router";

export class Conversation{
   public iConversationId:number;
   public iPersonId:number;
   public iConversationType:number;
   public dConversationDate:Date;
   public dtConversationTime:Date;
   public nvConversationSummary:string;
   public dtNextConversationDate:Date;

    constructor(){}
}