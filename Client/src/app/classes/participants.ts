export class Participants {
    iEventId :number;
    iPersonId:number;
    iArrivalStatusType:number;
    iCreatedByUserId:	number;
    dtCreatedate:Date;	
    iLastModifyUserId:number;
    dtLastModifyDate:Date;
    bSysRowStatus:boolean;
    constructor(_iEventId:number,_iPersonId:number,_iArrivalStatusType:number){
        this.iEventId=_iEventId;
        this.iPersonId=_iPersonId;
        this.iArrivalStatusType=_iArrivalStatusType;
    }
}
