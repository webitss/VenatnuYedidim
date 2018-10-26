import { Component, OnInit, Input, Output, OnDestroy, ViewChild, forwardRef, Inject } from '@angular/core';
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

  con;
  flagDelete = false;
  header = 'מחיקת שיחה';
  message = 'האם אתה בטוח שברצונך למחוק שיחה זו?';
  @Output()
  public sysTableList: SysTableRow[];
  @Input()
  public newConver: Conversation;
  @Input()
  public lstColumns = [
    {
      title: '',
      name: 'edit',
      bClickCell: true,
      type: 'html'
    },
    {
      title: '',
      name: 'delete',
      bClickCell: true,
      type: 'html'
    },
    {
      title: 'שם אברך',
      name: 'nvLastName',
    },
    {
      title: 'סוג שיחה',
      name: 'nvConversationType'
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
    // {
    //   title: 'תאריך שיחה הבאה',
    //   name: 'nvNextConversationDate'
    // },


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


  // addConversation() {
  //   this.conversationSelect = new Conversation();
  //   this.conversationSelect.dtConversationDate = null;
  //   //this.conversationSelect.dtConversationTime = null;
  //   //this.conversationSelect.dtNextConversationDate = null;

  // }
  // add(newConver)
  // {
  //   this.conversationsList.push(this.newConver);

  // }

  private alert: any;
  // deleteConversation() {
  //   this.appProxy.post('DeleteConversations', { iConversationId: this.con.iConversationId, iUserId: this.iUserId }).then(data => {
  //     this._parent.openMessagePopup('המחיקה בוצעה בהצלחה!');
  //     this.lstDataRows.splice(this.lstDataRows.indexOf(this.con), 1);
  //     this.vyTableComponent.refreshTable(this.lstDataRows);
  //   });
  // }


  //   ngOnInit() {
  //     this.appProxy.post("GetConversations", { iPersonId: this.iPersonId })
  //       .then(data => {
  //          this.conversationsList = data;
  //         data.forEach(conv => {
  //           this.lstDataRows.push({
  //             iConversationType: this.sysTableList.filter(s => s.iSysTableRowId == conv.iConversationType)[0],
  //             dConversationDate: conv.dConversationDate,
  //             dtConversationTime: conv.dtConversationTime,
  //             dtNextConversationDate: conv.dtNextConversationDate

  //           });

  //         });
  //        this.selectList();
  //       });
  //     }

  // selectList()
  // {

  //   this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(val => {
  //     this.sysTableList = val;
  //     this.conversationsList.forEach(c => {
  //       c['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == c.iConversationType)[0].nvValue;
  //       c['nvConversationDate'] = c.dConversationDate.toLocaleDateString();
  //       c['nvConversationTime'] = c.dtConversationTime.toLocaleTimeString();
  //       c['nvNextConversationDate'] = c.dtNextConversationDate.toLocaleDateString();
  //       c['edit'] = '<div class="edit"></div>';
  //       c['delete'] = '<div class="delete"></div>';
  //     });
  //   });
  // }}


  // saveNewConver(event) {
  //   //debugger;
  //   //this.conversationsList.push(event);
  //   this.changeTable(event);
  // }

  deleteConversation(c: Conversation, iUserId: number) {

    //this.alert = confirm("האם אתה בטוח שברצונך למחוק משתמש זה?");
    //if (this.alert == true) {
      this.appProxy.post('DeleteConversations', { iConversationId: c.iConversationId, iUserId: this.iUserId }).then(data => {
        this._parent.openMessagePopup('נמחק בהצלחה!');
       });
      this.lstDataRows.splice(this.lstDataRows.indexOf(c), 1);
      this.vyTableComponent.refreshTable(this.lstDataRows);
    //}
  }


  saveNewConver(conver: Conversation) {
    this.conversationsList.push(conver);
    this.changeTable(conver);
    //this.vyTableComponent.refreshTable(this.lstDataRows);
  }

  @ViewChild(VyTableComponent) cc: VyTableComponent;

  // updateConver(conver: Conversation) {
  //   this.lstDataRows.splice(this.lstDataRows.indexOf(conver), 1);
  //   this.vyTableComponent.refreshTable(this.lstDataRows);
  // }
  updateConver(conver: Conversation) {
    let l = this.conversationsList.indexOf(this.conversationsList.find(m1 => m1.iConversationId == this.conversationSelect.iConversationId))
    this.conversationsList[l] = conver;
    this.lstDataRows = this.conversationsList;
    //this.changeTable(conver);
    this.vyTableComponent.refreshTable(this.conversationsList);
    //this.cc.refreshTable(this.conversationsList)
  }

  changeTable(c: Conversation) {
    c['edit'] = '<div class="edit"></div>';
    c['delete'] = '<div class="delete"></div>';
    c['nvConversationDate'] = c.dtConversationDate.toLocaleDateString();
    c['nvConversationTime'] = c.dtConversationDate.toLocaleTimeString();
    c['nvLastName'] = c['lstObject'].nvFirstName + " " + c['lstObject'].nvLastName;
    c['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == c.iConversationType)[0].nvValue;
  }
  selecList(id) {
    this.appProxy.post("GetConversations", { iPersonId: id })
      .then(data => {
        this.conversationsList = data;
        this.lstDataRows = data;
        this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(val => {
          this.sysTableList = val;
          this.conversationsList.forEach(c => {
            this.changeTable(c);

          });
        });
      })

  }
  ngOnInit() {
    debugger;
    this.iUserId = this.globalService.getUser()['iUserId'];
    this.route.parent.params.subscribe(params => {
      this.iPersonId = +params['iPersonId'];
      //this.iPersonId.toString();

    });

    this.iUserId = this.globalService.getUser()['iUserId'];

    this.selecList(this.iPersonId);
  }
  // updateConver() {
  //   //debugger;
  //   this.conversationsList.slice(this.conversationsList.indexOf(this.conversationsList.find(m => m.iConversationId == this.conversationSelect.iConversationId), 0), 1);
  //   this.conversationsList.push(this.conversationSelect);
  //   //this.conversationsList.push(event);
  //   this.selecList(this.iPersonId);
  // }
  addNewMeeting(conver: Conversation) {
    this.conversationsList.push(conver);
  }
  newMeeting(newConver: Conversation) {
    this.changeTable(newConver);
    this.conversationsList.push(newConver);

    //  this.GetMeetingsByStudentId(this.iPersonId);
  }
  // changeTable(c: Conversation) {
  //   c['edit'] = '<div class="edit"></div>';
  //   c['delete'] = '<div class="delete"></div>';


  //   c['nvLastName'] = c['lstObject'].nvFirstName + " " + c['lstObject'].nvLastName;
  //   c['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == c.iConversationType)[0].nvValue;
  //   c['nvConversationDate'] = c.dtConversationDate.toLocaleDateString();
  //   c['nvConversationTime'] = c.dtConversationDate.toLocaleTimeString();
  //   //c['nvNextConversationDate'] = c.dtNextConversationDate.toLocaleString();
  // }//??
  // selecList(id) {
  //   this.appProxy.post("GetConversations", { iPersonId: id })
  //     .then(data => {
  //       this.conversationsList = data;
  //       this.lstDataRows = data;
  //       this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(val => {
  //         this.sysTableList = val;
  //         this.conversationsList.forEach(c => {
  //           this.changeTable(c);

  //         });
  //       });
  //     })
  // }


  // ngOnDestroy() {
  //           this.sub.unsubscribe();
  //         }
}
