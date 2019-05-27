import { Component, OnInit, Output, Input, ViewChild, forwardRef, Inject ,EventEmitter} from '@angular/core';
import { SettingYeshivaComponent } from '../setting-yeshiva/setting-yeshiva.component';
import { Yeshiva } from '../../classes/Yeshiva';
import { Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
// import {  } from 'events';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

import { GlobalService } from '../../services/global.service'
import { AppComponent } from '../app/app.component';


@Component({
  selector: 'app-settings-yeshivot',
  templateUrl: './settings-yeshivot.component.html',
  styleUrls: ['./settings-yeshivot.component.css']
})


export class SettingsYeshivotComponent implements OnInit {

  public iYeshivaId: number;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  protected yeshiva: Yeshiva;
  protected iLastModifyUserId: number;
  public flag;

  @ViewChild('yeshivot') yeshivot: any;
  @ViewChild("AppVyTable") vyTableComponent: VyTableComponent;

  // @Output()
  // public closeYeshiva = new EventEmitter();
  protected yeshivaList = new Array();

  @Output()
  protected sysTableList: SysTableRow[];
  public lstDataRows = [];

  flagDelete = false;
  message = '';
  header = 'מחיקת מוסד';





  constructor(private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  ngOnInit() {

    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true, false))
    this.lstColumns.push(new VyTableColumn('מחיקה', 'delete', 'html', true, false))
    this.lstColumns.push(new VyTableColumn('שם מוסד', 'nvYeshivaName'))
    this.lstColumns.push(new VyTableColumn('כתובת ', 'nvAddress'))
    this.lstColumns.push(new VyTableColumn('עיר', 'nvCity'))
    this.lstColumns.push(new VyTableColumn('שם איש קשר', 'nvContact'))
    this.lstColumns.push(new VyTableColumn('מייל', 'nvEmail'))
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'))
    this.lstColumns.push(new VyTableColumn('תפקיד', 'nvRoleType'))

    this.appProxy.post("GetAllYeshivot")
      .then(data => {
        this.yeshivaList = data;
        this.lstDataRows = data;
        this.sysTableService.getValues(SysTableService.dataTables.roleType.iSysTableId).then(val => {
          this.sysTableList = val;
          this.yeshivaList.forEach(y => {
            this.changeTable(y);
          })
        })
      })
  }


  changeTable(y: Yeshiva) {
    y['edit'] = '<div class="edit"></div>';
    y['delete'] = '<div class="delete"></div>';
    y['nvRoleType'] = this.sysTableList.filter(x => x.iSysTableRowId == y.iRoleType)?this.sysTableList.filter(x => x.iSysTableRowId == y.iRoleType)[0]?this.sysTableList.filter(x => x.iSysTableRowId == y.iRoleType)[0].nvValue:'':'';
    //this.yeshiva = y;
  }

  public setYeshiva(yeshiva) {
    if (yeshiva.columnClickName == 'edit')
      this.editYeshiva(yeshiva);
    else
      this.deleteYeshiva(yeshiva);
  }

  public editYeshiva(yeshiva) {
    this.changeTable(yeshiva);
    this.iYeshivaId = yeshiva.iYeshivaId;
    this.flag = false;
  }

  public deleteYeshiva(yeshiva) {
    this.iYeshivaId = yeshiva.iYeshivaId;
    this.flag = true;
    this.flagDelete = true;
    this.message = 'האם אתה בטוח שברצונך למחוק מוסד זה?';
    this.changeTable(yeshiva);
  }

  delete(yeshiva: Yeshiva) {
    this.appProxy.post('DeleteYeshiva', { iYeshivaId: this.iYeshivaId, iLastModifyUserId: this.iLastModifyUserId })
      .then(
        data => {
          //yeshiva = data;
          yeshiva= this.yeshivaList.find(y=>y.iYeshivaId==this.iYeshivaId);
          this.iYeshivaId = null;
          this.flag = null;
          this._parent.openMessagePopup('המחיקה התבצעה בהצלחה!');
          this.yeshivaList.splice(this.yeshivaList.indexOf(yeshiva), 1);
          this.vyTableComponent.refreshTable(this.yeshivaList);
        });
  }

  updateYeshiva(y: Yeshiva) {
    let l = this.yeshivaList.indexOf(this.yeshivaList.find(y1 => y1.iYeshivaId == y.iYeshivaId));
    this.changeTable(y);
    this.yeshivaList[l] = y;
    this.vyTableComponent.refreshTable(this.yeshivaList);
  }

  addNewYeshiva(y: Yeshiva) {
    this.yeshivaList.push(y);
    // this.selecList(y.iYeshivaId);
  }

  addYeshiva(yeshiva: Yeshiva) {
    this.changeTable(yeshiva);
    this.yeshivaList.push(yeshiva);
    this.vyTableComponent.refreshTable(this.yeshivaList);
  }

  // selecList(id) {
  //   this.appProxy.post("getYeshivaById", {id:this.iYeshivaId} )
  //     .then(data => {
  //       this.yeshivaList = data;
  //       this.sysTableService.getValues(SysTableService.dataTables.roleType.iSysTableId).then(val => {
  //         this.sysTableList = val;
  //         this.yeshivaList.forEach(y => {
  //           this.changeTable(y);
  //         });
  //       });
  //       this.vyTableComponent.refreshTable(this.yeshivaList);
  //     })
  // }

  close() {
    this.iYeshivaId = null;
    this.flag = null;
  }

  downloadExcel() {
    this.vyTableComponent.downloadExcel();
  }
}


