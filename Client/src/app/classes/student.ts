import { Person } from "./person";

export class Student implements Person {
    iPersonId: number;
    nvFirstName: String;
    nvLastName: String;
    nvIdentityCard: String;
    nvPhone: String;
    nvBirthday:String;
    dtBirthday:Date;
    nvAddress: String;
    nvCity: String;
    iCreatedByUserId: number;
    dtCreatedate: Date;
    iLastModifyUserId: number;
    dtLastModifyDate: Date;
    bSysRowStatus: boolean;
    nvStatus: String;
    nvMobile: String;
    nvEmail: String;


    iStudentId	:number;
    nvBornDate:string;
    dtBornDate:Date;
    nvFatherDeathDate:string;
    bDeathFather	:boolean;
    nvMotherDeathDate:string;
    bDeathMother	:Boolean;
    nvCauseOfDeathFather:string;
    nvCauseOfDeathMother:string;
    nvImgStudent:string
    nvYeshivaName:string
    nvYeshivaStreet:string
    nvYeshivaCity	:string
    dtAddStudentDate:Date;
    nvComment:string;
    
    constructor(){}
}