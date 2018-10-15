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
  protected sysTableRowList: SysTableRow[];
  protected iPerson: number;
  protected flag:boolean;
  protected iLastModifyUserId: number;
  protected s: any;
  protected personsList: string[];
  listToSelect: any[];
  allPersons: Array<Person>;
  title:string="רשימת כולם";
  inputTitle:string="בחר משתתפים";
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
      public lstDataRows = [];
     
      addParticipants(){
        // this.appProxy.post( "GetPersonList").then(data => {
        //   this.personsList = data;

        // });
       
        alert("func")
      }
      close() {
      //  להוסיף את המשתתפים שנבחרו
      }
  ngOnInit() {
    
    this.listToSelect=new Array<any>();

    this.appProxy.post('GetPersonList', { iPersonId: 0 }).then(
      data =>{

       this.allPersons = data
      //  this.allPersons.forEach(
      //   st => {
      //      st['delete'] = '<button class="btn delete" >מחק</button>'; 
      //     });

          this.allPersons.forEach(
            person=>{
              this.listToSelect.push({value:person.nvFirstName+' '+person.nvLastName+" "});
            }
          );
    }
      , err => alert(err));
    
    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params['iEventId'];
      this.appProxy.post( "GetParticipantsList" , { iEventId: this.iEventId }).then(res => {

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
           this.lstDataRows.forEach( p => {
             p['delete'] = '<div class="delete"></div>';
           });
        });
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




