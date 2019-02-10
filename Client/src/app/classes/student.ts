import { Person } from "./person";

export class Student implements Person {


    public iPersonId: number=null;
    public nvFirstName: string=null;
    public nvLastName: string=null;
    public nvIdentityCard: string=null;
    public nvPhone: string=null;
    public nvMobile: string=null;
    public nvEmail: string=null;
    public nvAddress: string=null;
    public nvCity: string=null;
    public nvStatus: string=null;
    public nvBirthdate: string=null;
    public dtBirthdate: Date= new Date();

    public iStudentId: number=null;
    public nvFatherDeathDate: string=null;
    public bDeathFather: boolean=false;
    public nvMotherDeathDate: string=null;
    public bDeathMother: Boolean=null;
    public iCauseOfDeathFather:number=null;
    public iCauseOfDeathMother:number=null;
    public nvImgStudent: string=null;
    public dtAddStudentDate: Date= new Date();
    public nvComment: string=null;
    public iStatusType:number=null;

    public fDays:number;
    public fMonthes:number;
    public fYears:number;
    constructor() {
       
    }

}

//AIzaSyDmcJWztCYo2xInukOD2bnFp-lPK-IFuCA 