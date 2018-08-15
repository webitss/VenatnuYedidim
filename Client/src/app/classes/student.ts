import { Person } from "./person";

export class Student implements Person {


    public iPersonId: number;
    public nvFirstName: String;
    public nvLastName: string;
    public nvIdentityCard: string;
    public nvPhone: string;
    public nvMobile: string;
    public nvEmail: string;
    public nvAddress: string;
    public nvCity: string;
    public nvStatus: string;
    public nvBirthdate: string;
    public dtBirthdate: Date;

    public iStudentId: number;
    public nvFatherDeathDate: string;
    public bDeathFather: boolean;
    public nvMotherDeathDate: string;
    public bDeathMother: Boolean;
    public nvCauseOfDeathFather: string;
    public nvCauseOfDeathMother: string;
    public nvImgStudent: string
    public nvYeshivaName: string
    public nvYeshivaStreet: string
    public nvYeshivaCity: string
    public dtAddStudentDate: Date;
    public nvComment: string;

    constructor() {

        this.dtBirthdate = new Date();
        this.dtAddStudentDate= new Date();
    }

}