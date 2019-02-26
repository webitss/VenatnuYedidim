import { Data } from "@angular/router";

export class Conversation {
    public iPersonId: number;
    public iConversationId: number;

    public iConversationType: number;
    public dtConversationDate: Date;

    public nvConversationSummary: string;
    //public dtNextConversationDate:Date;
    public iAvrechId: number;
    constructor() {
        this.dtConversationDate = new Date();
        //this.dtNextConversationDate=new Date();
    }
}