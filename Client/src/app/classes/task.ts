import { Time } from "@angular/common";


export class Task {
    public iTaskId: number;
    public iTaskType: number;
    public dtTaskdatetime: Date;
    // public tTaskTime:Time;
    public nvComment:string;
    public iPersonId:number;
    // public iCreatedByUserId: number;
    // public dtCreatedate: Date;
    // public iLastModifyUserId: number;
    // public dtLastModifyDate: Date;
    // public bSysRowStatus: boolean;
    
    public constructor() 
    {
       // this.iTaskId=0;
        // this.iTaskType=0;
       this.dtTaskdatetime = new Date();
    }

}