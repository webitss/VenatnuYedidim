    export class Meeting{
    iMeetingId:number;
    iPersonId:number;
    iMeetingType:number;
    dtMeetingDate:Date;
    nvSummary:string;
    iCreatedByUserId:number;
    dtCreatedate:Date;	
    iLastModifyUserId:number;
    dtLastModifyDate:Date;
    bSysRowStatus:boolean;    
    iAvrechId:number;

    constructor(){
        this.dtMeetingDate=new Date();
    }
    }