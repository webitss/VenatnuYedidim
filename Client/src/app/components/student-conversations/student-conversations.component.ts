import { Component, OnInit, Input, Output } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Conversation } from '../../classes/conversation';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';

import { StudentConversationDetailsComponent } from '../student-conversation-details/student-conversation-details.component';
import { Title } from '@angular/platform-browser';
import { SelectorListContext } from '@angular/compiler';


@Component({
  selector: 'app-student-conversations',
  templateUrl: './student-conversations.component.html',
  styleUrls: ['./student-conversations.component.css']
})
export class StudentConversationsComponent implements OnInit {

  protected iPersonId: number = 7;
  protected flag: number;
  protected conversationsList: Array<Conversation> = new Array<Conversation>();
  protected conversationSelect: Conversation;
  @Output()
  protected sysTableList: SysTableRow[];
  @Input()
  protected newConver:Conversation;
  @Input()
  public lstColumns = [
    {
      title: 'עריכה',
      name: 'edit',
      bClickCell: true,
      type: 'html'
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

  constructor(private appProxy: AppProxy, private sysTableService: SysTableService) { }

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
    this.conversationSelect.dConversationDate = new Date();
    this.conversationSelect.dtConversationTime = new Date();
    this.conversationSelect.dtNextConversationDate = new Date();

  }


  deleteConversation(iConversationId: number, iUserId: number) {
    this.appProxy.post("DeleteConversations", { iConversationId: iConversationId, iUserId: 1 })
      .then(
        data => {
          this.conversationsList = data;
          this.conversationsList.push(this.newConver);
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
    this.appProxy.post("GetConversations", { iPersonId: this.iPersonId })
      .then(data => {
        this.conversationsList = data;
        this.sysTableService.getValues(SysTableService.dataTables.conversationType.iSysTableId).then(val => {
          this.sysTableList = val;
          this.conversationsList.forEach(c => {
            c['nvConversationDate'] = c.dConversationDate.toLocaleDateString();
            c['nvConversationTime'] = c.dtConversationTime.toLocaleTimeString();
            c['nvNextConversationDate'] = c.dtNextConversationDate.toLocaleDateString();
            c['edit'] = '<div class="edit"></div>';
            c['delete'] = '<div class="delete"></div>';
            c['nvConversationType'] = this.sysTableList.filter(s => s.iSysTableRowId == c.iConversationType)[0].nvValue;
          });
        });

      });
  }
}