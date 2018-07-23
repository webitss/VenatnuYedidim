import { Person } from "./person";

export class Student implements Person {


    public iPersonId: number;
    public nvFirstName: String;
    public nvLastName: String;
    public nvIdentityCard: String;
    public nvPhone: String;
    public nvMobile: String;
    public nvEmail: String;
    public nvAddress: String;
    public nvCity: String;
    public nvStatus: String;
    public nvBirthdate: String;
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