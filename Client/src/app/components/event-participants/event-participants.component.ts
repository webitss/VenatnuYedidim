import { Component, OnInit, Injectable, forwardRef, Inject, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Participants } from '../../classes/participants';
import { ActivatedRoute } from '@angular/router';
import { SysTableRow } from '../../classes/SysTableRow';
import { Person } from '../../classes/person';
import { GlobalService } from '../../services/global.service';
import { SysTableService } from '../../services/sys-table.service';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { NgIf } from '@angular/common';
import { AppComponent } from '../app/app.component';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { EventParticipant } from '../../classes/event-participant';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent implements OnInit {


  participantList: Person[] = [];
  protected iEventId: number;
  private sub: any;
  protected participant: Array<any> = new Array<any>();
  public sysTableRowList: SysTableRow[];
  protected iPerson: number;
  public flag: boolean;
  protected iLastModifyUserId: number;
  protected s: any;
  protected personsList: string[];
  // protected listToSelect: person[];
  listToSelect: Array<any>;
   allPersons: Array<any>;
  title: string = "רשימת כולם";
  inputTitle: string = "בחר משתתפים";
  flagDelete = false;
  flagUpdate=false;
  message = 'האם אתה בטוח שברצונך למחוק משתתף זה?';
  header = 'מחיקת משתתף';
  iPersonId: number;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  id: number;
  constructor(@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent,private _sanitizer: DomSanitizer,
   private appProxy: AppProxy, private router: ActivatedRoute, private sysTableService: SysTableService, private globalService: GlobalService) { }
  cancel(event) {
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
    new VyTableColumn('סטטוס הגעה', 'iArriveStatusType','select')
  ];
  public Columns = [
    new VyTableColumn('בחר', 'checked', 'checkbox'),
    new VyTableColumn('שם פרטי', 'nvFirstName'),
    new VyTableColumn('סוג משתמש', 'nvParticipantType'),

  ];
  public lstDataRows = [];

  addParticipants() {
    this.listToSelect = [];
    this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId}).then(res => {
      if (res.length > 0) {
        res.forEach(p => {
          let nvArriveStatusType = this.sysTableRowList.filter(s => s.iSysTableRowId == (p.lstObject ? p.lstObject.iArrivalStatusType : p.iArrivalStatusType));
          let iArriveStatusType = nvArriveStatusType && nvArriveStatusType[0] ? nvArriveStatusType[0].nvValue : ''
    
          // this.participant.forEach(p => {
          this.lstDataRows.push({
            delete: '<div class="delete"></div>',
            iEventId: p.iEventId,
            nvFirstName: p.nvFirstName,
            nvLastName: p.nvLastName,
            nvPhone: p.nvPhone,
            nvMobile: p.nvMobile,
            nvEmail: p.nvEmail,
            nvParticipantType: p.lstObject ? p.lstObject.nvParticipantType : p.nvParticipantType,
            iArriveStatusType: iArriveStatusType,
            iPersonId: p.iPersonId
          });
        });
        // this.participantList = res;
        // this.lstDataRows = res;
      }
          debugger;

      this.appProxy.post("GetPersonList").then(
        data => {
          debugger;
          this.allPersons = data;
          this.flag = true
          this.listToSelect = this.allPersons.filter(per => (!this.participantList.find(p => p.iPersonId == per.iPersonId)));
          this.listToSelect.forEach(
            person => {
              person['value'] = person.nvFirstName + ' ' + person.lstObject['nvParticipantType'];
              person['nvParticipantType'] = person.lstObject['nvParticipantType'];

              //this.listToSelect.push({ value: person.nvFirstName + ' ' + person.lstObject['nvParticipantType'], iPersonId: person.iPersonId });
              //this.iPersonId = person.iPersonId;

            }
          );
        });
    }
    );


  }
  public inputpdf(str) : SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(str);
 }

  //  להוסיף את המשתתפים שנבחרו
  listParticipant: Array<EventParticipant>;

  eventParticipant: EventParticipant
  // event: any;
  save() {
if(this.flagUpdate)
{
  
this.appProxy.post("updateArriveStatus",{lstParticipant: this.lstParticipant ,iUserId:this.id}).then(data=>{
  if(data){
    this._parent.openMessagePopup('עדכון השנויים התבצע בהצלחה!'); 
  }
     else {
        this._parent.openMessagePopup('שמירת הקובץ נכשלה'); 
  }
  
})
}
else{
      this.listParticipant = new Array<EventParticipant>();
    this.eventParticipant = new EventParticipant();
    let sumSave = 0;
    let lstToSave = this.listToSelect.filter(f => f['checked'] == true);
    let sumToSave = lstToSave.length;
    this.flag = false;
    lstToSave.forEach(item => {
      if (item['checked'] == true) {
        this.eventParticipant = new EventParticipant();
        this.eventParticipant.iPersonId = item.iPersonId;
        this.eventParticipant.iEventId = this.iEventId;
        this.eventParticipant.iArrivalStatusType = 34;
        this.listParticipant.push(this.eventParticipant);
        // this.vyTableComponent.refreshTable(this.listParticipant);
      }
    });

    this.appProxy.post("SetEventParticipantList", {
      listParticipant: this.listParticipant, iUserId: this.globalService.getUser().iPersonId
    })
      .then(data => {
        if (data == true) {
          // sumSave++;

          // if (sumSave == sumToSave) {
          this._parent.openMessagePopup("השמירה בוצעה בהצלחה!");
          this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId }).then(res => {
            if (res.length > 0) {
             
              this.participantList = res;
              this.lstDataRows = res;
            }
            this.buildGrid(this.lstDataRows, true);
          });
        }

        else
          this._parent.openMessagePopup("השמירה נכשלה");

      });



}
    // });

  }
  ngOnInit() {
    this.id = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
    this.listToSelect = new Array<any>();

    this.appProxy.post('GetPersonByUserId', { iUserId: this.id }).then(
      data => {



        this.allPersons = data

        this.allPersons.forEach(
          person => {
            this.listToSelect.push({ value: person.nvFirstName + ' ' + person.lstObject['nvParticipantType'] });
            
          }
        );

      }
      , err => alert(err));

    this.sub = this.router.parent.params.subscribe(params => {
      this.iEventId = +params['iEventId'];
      this.appProxy.post("GetParticipantsList", { iEventId: this.iEventId ,iUserId: this.id}).then(res => {
        if (res.length > 0) {

          this.participantList = res;
          this.sysTableService.getValues(SysTableService.dataTables.arrivalType.iSysTableId).then(data => {
            this.sysTableRowList = data;
            this.buildGrid(res, false);

          });

          // });

        }

      });
    });
  }
  iArriveStatusType:any;
  arrive:Array<number>=new Array<number>();
  buildGrid(lst, refresh) {
    this.lstDataRows = [];
    lst.forEach(p => {
      let nvArriveStatusType = this.sysTableRowList.filter(s => s.iSysTableRowId == (p.lstObject ? p.lstObject.iArrivalStatusType : p.iArrivalStatusType));
      this.arrive.push(nvArriveStatusType[0].iSysTableRowId)
      this.createSelect();
       this.iArriveStatusType = nvArriveStatusType && nvArriveStatusType[0] ? nvArriveStatusType[0].nvValue : ''

      // this.participant.forEach(p => {
      this.lstDataRows.push({
        delete: '<div class="delete"></div>',
        iEventId: p.iEventId,
        nvFirstName: p.nvFirstName,
        nvLastName: p.nvLastName,
        nvPhone: p.nvPhone,
        nvMobile: p.nvMobile,
        nvEmail: p.nvEmail,
        nvParticipantType: p.lstObject ? p.lstObject.nvParticipantType : p.nvParticipantType,
        // iArriveStatusType: iArriveStatusType,
        iPersonId: p.iPersonId,
        iArriveStatusType:{value:nvArriveStatusType[0].iSysTableRowId,options:this.createSelect()}         
      });
    });
    if (refresh)
      this.vyTableComponent.refreshTable(this.lstDataRows);
  }

  click(e) {
    debugger;
    // this.avrechId = e.iPersonId;
    if (e.columnClickName == "delete")
      this.delete(e);


  }
  // iEventId :number;
  //   iPersonId:number;
  //   iArrivalStatusType
lstChange:Array<any>=new Array<any>();
lstParticipant:Array<Participants>=new Array<Participants>();
  change(item){
    debugger;
    this.lstChange.push(item);
    this.lstParticipant.push(new Participants(this.iEventId,item.iPersonId,parseInt(item.iArriveStatusType.value)));
    this.flagUpdate=true;
    // this.appProxy.post("SetEventParticipant",{isNew:false,iStatusType:parseInt(item.iArriveStatusType.value),iPersonId:item.iPersonId,iEventId:this.iEventId,iUserId:this.id})
  }

 public d:string;
 options:Array<any>;
createSelect(){
 
  this.options=new Array<any>()
  this.sysTableRowList.forEach(s => {
    this.options.push({id:s.iSysTableRowId,value:s.nvValue});
        });
return this.options;
  
  // this.arrive.forEach(ls=>{
  //     this.d='<select for="s" style="width:120px"'+'#s="ngModel"'+ '[(ngModel)]="'+ls+'">'
  // this.sysTableRowList.forEach(s => {
  //       this.d+='<option value="'+s.iSysTableRowId+'">'+ s.nvValue+'</option>'
  //       });
  // })

  //      this.d+='</select>';  
}

  delete(e) {
    this.appProxy.post('DeleteParticipant', { iEventId: this.iEventId, iPersonId: e.iPersonId, iUserId: this.globalService.getUser().iPersonId })
      .then(data => {
        this._parent.openMessagePopup('המחיקה בוצעה בהצלחה!');
        this.lstDataRows.splice(this.lstDataRows.findIndex(p => p.iPersonId == e.iPersonId), 1);
        this.vyTableComponent.refreshTable(this.lstDataRows);
      }).catch(err => {
        // alert(err)
      });

  }
}




