import { Component, OnInit, Input, Output, OnDestroy, ViewChild, forwardRef, Inject, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { ActivatedRoute, Router } from '@angular/router';


import { StudentConversationDetailsComponent } from '../student-conversation-details/student-conversation-details.component';
import { Title } from '@angular/platform-browser';
import { SelectorListContext } from '@angular/compiler';
import { GlobalService } from '../../services/global.service'
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { AppComponent } from '../app/app.component';
import { Task } from '../../classes/task';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  private sub: any;
  protected iUserId: number;
  protected iPersonId: number;
  protected flag: number;
  public conversationsList: Array<Conversation> = new Array<Conversation>();
  public conversationSelect: Conversation;
  protected conv:Conversation;
  protected name:string; 

  student:Student;
  con;
  flagDelete = false;
  header = 'מחיקת שיחה';
  message = 'האם אתה בטוח שברצונך למחוק שיחה זו?';
  @Output()
  public sysTableList: SysTableRow[];
  @Input()
  public newConver: Conversation;
public flagCome:boolean;
  @Input()
  public lstColumns = [
    {
      title: 'עריכה',
      name: 'edit',
      bClickCell: true,
      type: 'html'
    },
    {
      title: 'מחיקה',
      name: 'delete',
      bClickCell: true,
      type: 'html'
    }, 
    {
      title: 'סוג שיחה',
      name: 'nvConversationType'
    },
    {
      title: 'שם אברך',
      name: 'avrechName',
    },
   
    {
      title: 'תאריך שיחה',
      name: 'nvConversationDate'
    },
    {
      title: 'שעת שיחה',
      name: 'nvConversationTime'
    },
    {
      title: 'סיכום שיחה',
      name: 'nvConversationSummary'
    },

  ];
  public lstDataRows = [];

  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService, private route: ActivatedRoute
    , @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }


  // newConversation() {
  //   this.conversationSelect = new Conversation();
  // }

  close() {
    this.conversationSelect = null;
  }
  click(conver) {
    if (conver.columnClickName == 'delete')
      this.delCon(conver);
    else
      this.conversationSelect = conver;
    this.flag = 1;

  }

  delCon(conver) {
    this.con = conver;
    this.flagDelete = true;
  }


  addConversation() {
    this.conversationSelect = new Conversation();
    this.conversationSelect.dtConversationDate = null;
debugger;
  }

  private alert: any;
 


  deleteConversation(c: Conversation) {

   
    
      this.appProxy.post('DeleteConversations', { iConversationId:this.con.iConversationId, iUserId: this.iUserId }).then(data => {
        this._parent.openMessagePopup('המחיקה התבצעה בהצלחה!');
         this.lstDataRows.splice(this.lstDataRows.indexOf(this.con), 1);
      this.vyTableComponent.refreshTable(this.lstDataRows);
       });
     
    
  }


  saveNewConver(conver: Conversation) {
    debugger;
    this.changeTable(conver);
    this.lstDataRows.push(this.conv);
    this.vyTableComponent.refreshTable(this.lstDataRows);
  
  }

  @ViewChild(VyTableComponent) cc: VyTableComponent;

  updateConver(conver: Conversation) {
    let l = this.conversationsList.indexOf(this.conversationsList.find(m1 => m1.iConversationId == this.conversationSelect.iConversationId))
    this.changeTable(conver);
    this.conversationsList[l] = this.conv;
    this.vyTableComponent.refreshTable(this.conversationsList);
  }

  // m['nvDate'] = m.dtMeetingDate.toLocaleDateString();
  // m['nvHour'] = m.dtMeetingDate.toLocaleTimeString();
  // m['edit'] = '<div class="edit"></div>';
  // m['delete'] = '<div class="delete"></div>';
  // m['nvMeetingType'] = this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)?this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)[0]?this.sysTableRowList.filter(s => s.iSysTableRowId == m.iMeetingType)[0].nvValue:'':'';
  // m['iAvrechId']=m.iAvrechId;
  // m['avrechName']=m.avrechName;


  changeTable(c: Conversation) {
    debugger;
    c['nvConversationDate'] = c.dtConversationDate.toLocaleDateString();
    c['nvConversationTime'] = c.dtConversationDate.toLocaleTimeString();

    c['avrechName']=this.name;
    c['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == c.iConversationType)[0].nvValue;
    c['edit'] = '<div class="edit"></div>';
    c['delete'] = '<div class="delete"></div>';
    this.conv=c;
  }
  selecList(id,iAvrechId) {
    debugger;
    this.appProxy.post("GetAvrechById",{iPersonId:iAvrechId}).then(d=>{
      if(d){
          this.name=d.nvFirstName+' '+d.nvLastName;
    this.appProxy.post("GetConversations", { iPersonId: id })
      .then(data => {
        debugger;
        this.conversationsList = data;
        this.lstDataRows = data;
        this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(val => {
          this.sysTableList = val;
          this.conversationsList.forEach(c => {
            c['avrechName'] = c['lstObject'].nvFirstName + " " + c['lstObject'].nvLastName;
            this.name=c['avrechName'];
            this.changeTable(c);

          });
        });
      })
      }
    })

  }
  ngOnInit() {
    this.flagCome=false;
    this.iUserId = this.globalService.getUser()['iUserId'];
    this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId'];

      //this.iPersonId.toString();

    });
debugger;
    this.appProxy.post("GetStudentById",{iStudentId:this.iPersonId}).then(dd=>{
      this.student=dd;      
      this.globalService.student=this.student;
debugger;
   
    this.iUserId = this.globalService.getUser()['iUserId'];
debugger;
    this.selecList(this.iPersonId,this.student.iAvrechId);
   })
  }
}

