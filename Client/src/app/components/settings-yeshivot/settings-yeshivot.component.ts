import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { SettingYeshivaComponent } from '../setting-yeshiva/setting-yeshiva.component';
import { Yeshiva } from '../../classes/Yeshiva';
import { Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { EventEmitter } from 'events';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';

@Component({
  selector: 'app-settings-yeshivot',
  templateUrl: './settings-yeshivot.component.html',
  styleUrls: ['./settings-yeshivot.component.css']
})


export class SettingsYeshivotComponent implements OnInit {

  protected yeshivaList: Array<Yeshiva> = new Array<Yeshiva>();
  protected iYeshivaId: number;
  protected lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  protected yeshiva:Yeshiva;
  protected iuserId:number;
  @ViewChild('yeshivot') yeshivot:any;

 
  @Output()
  protected sysTableList:SysTableRow[];
  
  constructor(private appProxy: AppProxy,private router:Router,private sysTableService:SysTableService) { }
 
  ngOnInit() {

    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true,false))
    this.lstColumns.push(new VyTableColumn('שם מוסד', 'nvYeshivaName'))
    this.lstColumns.push(new VyTableColumn('כתובת ', 'nvAddress'))
    this.lstColumns.push(new VyTableColumn('עיר', 'nvCity'))
    this.lstColumns.push(new VyTableColumn('שם איש קשר', 'nvContact'))
    this.lstColumns.push(new VyTableColumn('מייל', 'nvEmail'))
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'))
    this.lstColumns.push(new VyTableColumn('תפקיד', 'nvRoleType'))
    this.lstColumns.push(new VyTableColumn('מחיקה','delete','html',true,false))

    this.appProxy.post('GetAllYeshivot').then(data => {
      this.yeshivaList = data;
      this.sysTableService.getValues(SysTableService.dataTables.roleType.iSysTableId).then(val=> {
        this.sysTableList=val;
        this.yeshivaList.forEach(y=> {
          y['edit'] = '<div class="edit"></div>';
          y['delete'] = '<div> class="delete"></div>';
          y['nvRoleType']=this.sysTableList.filter(x=>x.iSysTableRowId==y.iRoleType)[0].nvValue;
        });
      });
    });
  }

  public setYeshiva(yeshiva){
    if('edit')
      this.editYeshiva(yeshiva);
    else if('delete')
      this.deleteYeshiva(yeshiva);
  }

  public editYeshiva(yeshiva) {
    this.iYeshivaId = yeshiva.iYeshivaId;
  }

  public deleteYeshiva(yeshiva) {
    this.iYeshivaId=yeshiva.iYeshivaId;
    yeshiva.iYeshivaId=null;
  }

  close() {
    this.iYeshivaId = null;
  }

  downloadExcel(){
    this.yeshivot.downloadExcel();
  }
}
