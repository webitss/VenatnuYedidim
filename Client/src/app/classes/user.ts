import { Person } from "./person";

export class User extends Person {
    public iPersonId: number;
    public nvUserName: string;
    public nvPassword: string;
    public iPermissionId: number
    public dtCreatedate: Date;

    constructor() {
         super();
         this.nvUserName = '';
         this.nvPassword = '';
         this.iPermissionId = 0;
         this.dtCreatedate = new Date();
        }
}