export class Person {
    public iPersonId: number;
    public nvFirstName: string;
    public nvLastName: string;
    public nvIdentityCard: string;
    public nvPhone: string;
    public nvMobile: String;
    public nvEmail: string;
    public nvAddress: string;
    public nvCity: string;
    public nvStatus: string;
    public nvBirthdate	:string
    public dtBirthdate:Date

    constructor() {
        this.iPersonId = 0;
        this.nvFirstName = '';
        this.nvLastName = '';
        this.nvIdentityCard = '';
        this.nvPhone = '';
        this.nvMobile = '';
        this.nvEmail = '';
        this.nvAddress = '';
        this.nvCity = '';
        this.nvStatus = '';
        this.nvBirthdate='';
        this.dtBirthdate=new Date();

    }


}