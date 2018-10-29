import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';
import { ActivatedRoute } from '@angular/router';
import { SysTableRow } from '../../classes/SysTableRow';
import { Person } from '../../classes/person';

import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {
  protected iEventId: number;
  private sub: any;
  protected participant: Array<any> = new Array<any>();
  public sysTableRowList: SysTableRow[];
  protected iPerson: number;
  public flag: boolean;
  protected iLastModifyUserId: number;
  protected s: any;
  protected personsList: string[];
  listToSelect: any[];
<<<<<<< HEAD
  allPersons: Array<any>;
  title:string="רשימת כולם";
  inputTitle:string="בחר משתתפים";
  flagDelete=false;
  message='האם אתה בטוח שברצונך למחוק משתתף זה?';
  header='מחיקת משתתף';
=======
  allPersons: Array<Person>;
  title: string = "רשימת כולם";
  inputTitle: string = "בחר משתתפים";
  flagDelete = false;
  message = 'האם אתה בטוח שברצונך למחוק משתתף זה?';
  header = 'מחיקת משתתף';
  participantList: Person[];
>>>>>>> c09e7f14de628064afa60bf391b8164375cc4fb3
  constructor(private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService) { }

  cancelAdd(event) {
    this.flag = false;
  }
  public lstColumns = [
    new VyTableColumn('מחיקה', 'delete', 'html', true, false),
    new VyTableColumn('שם פרטי', 'nvFirstName'),
    new VyTableColumn('שם משפחה', 'nvLastName'),
    new VyTableColumn('טלפון', 'nvPhone'),
    new VyTableColumn('נייד', 'nvMobile'),
    new VyTableColumn('מייל', 'nvEmail'),
    new VyTableColumn('סוג משתמש', 'nvParticipantType'),
    new VyTableColumn('סטטוס הגעה', 'iArriveStatusType', 'html', true, false)
  ];
<<<<<<< HEAD
      public lstDataRows = [];
     
      addParticipants(){
     this.appProxy.post( "GetPersonList").then(data => {
        this.personsList = data;
        this.flag=true
       });
       
        alert("func")
      }
      close() {
      //  להוסיף את המשתתפים שנבחרו
=======
  public lstDataRows = [];

  addParticipants() {
    // this.appProxy.post( "GetPersonList").then(data => {
    //   this.personsList = data;

    // });

    alert("func")
  }

  getParticipantListByEvent(eventId:number){
    this.appProxy.post("GetParticipantsList", { iEventId: eventId }).then(res => {
      if (res.length > 0) {
        this.participantList = res;

        this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
          this.sysTableRowList = data;
        });
        res.forEach(p => {
          // this.participant.forEach(p => {
          this.lstDataRows.push({
            delete: p.delete,
            iEventId: p.iEventId,
            nvFirstName: p.nvFirstName,
            nvLastName: p.nvLastName,
            nvPhone: p.nvPhone,
            nvMobile: p.nvMobile,
            nvEmail: p.nvEmail,
            nvParticipantType: p.lstObject.nvParticipantType,
            // iArriveStatusType: p.iArriveStatusType,
            iArriveStatusType: '<select> <option>j,k</option><option>ughjk</option></select>'
            // iArriveStatusType:'<button>fgd</button>'
            // iArriveStatusType: this.sysTableRowList.filter(s => s.iSysTableRowId ==parseInt (p.lstObject.iArrivalStatusType))[0].nvValue;
          });
        });
        // });
        this.lstDataRows.forEach(p => {
          p['delete'] = '<div class="delete"></div>';
        });
>>>>>>> c09e7f14de628064afa60bf391b8164375cc4fb3
      }
    });
  }


  close() {
    //  להוסיף את המשתתפים שנבחרו
  }

  //יש לקרוא לפונקציה זו מפונקציה SAVE
  IsParticipantsExists(participantId: number , eventId:number) {
    this.getParticipantListByEvent(eventId);
    this.participantList.forEach(p => {
      if (p.iPersonId == participantId)
        return true;
    });
    return false;
  }
  ngOnInit() {

    this.listToSelect = new Array<any>();

    this.appProxy.post('GetPersonList', { iPersonId: 0 }).then(
<<<<<<< HEAD
      data =>{

       this.allPersons = data
      //  this.allPersons.forEach(
      //   st => {
      //      st['delete'] = '<button class="btn delete" >מחק</button>'; 
      //     });

          this.allPersons.forEach(
            person=>{
              this.listToSelect.push({value:person.nvFirstName+' '+person.nvParticipantType+" "});
            }
          );
    }
=======
      data => {

        this.allPersons = data
        //  this.allPersons.forEach(
        //   st => {
        //      st['delete'] = '<button class="btn delete" >מחק</button>'; 
        //     });

        this.allPersons.forEach(
          person => {
            this.listToSelect.push({ value: person.nvFirstName + ' ' + person.nvLastName + " " });
          }
        );
      }
>>>>>>> c09e7f14de628064afa60bf391b8164375cc4fb3
      , err => alert(err));

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params['iEventId'];
      this.getParticipantListByEvent(this.iEventId);
      // alert("x");
    })
  };
}
  // public deleteYeshiva(yeshiva) {
  //   this.iPerson=yeshiva.iYeshivaId;
  //   this.flag=true;
  // }

  // delete() {
  //   this.appProxy.post('DeleteParticipant',{iYeshivaId:this.iPerson,iLastModifyUserId:this.iLastModifyUserId})
  //   .then(
  //       data=>{
  //       this.iPerson=data;
  //       alert("המשתתף נמחק בהצלחה");
  //   });
  // }

  // close() {
  //   this.iPerson = null;
  //   this.flag=null;
  // }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }




