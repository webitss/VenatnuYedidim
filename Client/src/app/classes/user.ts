import { Person } from "./person";

export class User extends Person {
    public iPersonId: number;
    public nvUserName: string;
    public nvPassword: string;
    public iPermissionId: number
    public dtCreatedate: Date;

    constructor() { super(); }
}