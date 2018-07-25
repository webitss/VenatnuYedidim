export class Person {
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
    public nvBirthdate	:String
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
        this.nvBirthdate='';
        this.dtBirthdate=new Date();

    }


}