import { Component, OnInit, Input, Output } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { ActivatedRoute, Router } from '@angular/router';


import { StudentConversationDetailsComponent } from '../student-conversation-details/student-conversation-details.component';
import { Title } from '@angular/platform-browser';
import { SelectorListContext } from '@angular/compiler';
import { GlobalService } from '../../services/global.service'

@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {

  protected iUserId: number;
  protected iPersonId: number;
  protected flag: number;
  protected conversationsList: Array<Conversation> = new Array<Conversation>();
  protected conversationSelect: Conversation;
  @Output()
  protected sysTableList: SysTableRow[];
  @Input()
  protected newConver: Conversation;
  @Input()
  public lstColumns = [
    {
      title: 'עריכה',
      name: 'edit',
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
    {
      title: 'תאריך שיחה הבאה',
      name: 'nvNextConversationDate'
    },


  ];
  public lstDataRows = [];

  constructor(private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService, private route: ActivatedRoute) { }


  // newConversation() {
  //   this.conversationSelect = new Conversation();
  // }

  close() {
    this.conversationSelect = null;
  }
  editConversation(conver: Conversation) {
    this.conversationSelect = conver;
    this.flag = 1;
  }

  addConversation() {
    this.conversationSelect = new Conversation();
    this.conversationSelect.dConversationDate = null;
    this.conversationSelect.dtConversationTime = null;
    this.conversationSelect.dtNextConversationDate = null;

  }
  // add(newConver)
  // {
  //   this.conversationsList.push(this.newConver);

  // }
  deleteConversation(iConversationId: number, iUserId: number) {
    this.appProxy.post("DeleteConversations", { iConversationId: iConversationId, iUserId: this.iUserId })
      .then(
        data => {
          this.conversationsList = data;

          alert("sucsses");
        }).catch(err => {
          alert(err);
        });
  }

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
  ngOnInit() {
    this.iUserId = this.globalService.getUser()['iUserId'];
    this.route.parent.params.subscribe(params => {
      this.iPersonId = params['iPersonId'];
    });

    this.iUserId = this.globalService.getUser()['iUserId'];
    this.selecList();
  }
  saveNewConver(event) {
    //debugger;
    //this.conversationsList.push(event);
    this.selecList();
  }
  selecList() {
    this.appProxy.post("GetConversations", { iPersonId: this.iPersonId })
      .then(data => {
        this.conversationsList = data;
        this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(val => {
          this.sysTableList = val;
          this.conversationsList.forEach(c => {
            c['nvLastName']=c['lstObject'].nvFirstName+" "+c['lstObject'].nvLastName;
            c['nvConversationDate'] = c.dConversationDate.toLocaleDateString();
            c['nvConversationTime'] = c.dtConversationTime.toLocaleTimeString();
            c['nvNextConversationDate'] = c.dtNextConversationDate.toLocaleString();
            c['edit'] = '<div class="edit"></div>';
            c['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == c.iConversationType)[0].nvValue;
          });
        });

      });

  }
}