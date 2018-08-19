import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { SettingYeshivaComponent } from '../setting-yeshiva/setting-yeshiva.component';
import { Yeshiva } from '../../classes/Yeshiva';
import { Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { EventEmitter } from 'events';

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
  @ViewChild('yeshivot') yeshivot:any;

  
  constructor(private appProxy: AppProxy,private router:Router) { }
 
  ngOnInit() {

    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true,false))
    this.lstColumns.push(new VyTableColumn('שם מוסד', 'nvYeshivaName'))
    this.lstColumns.push(new VyTableColumn('כתובת ', 'nvAddress'))
    this.lstColumns.push(new VyTableColumn('עיר', 'nvCity'))
    this.lstColumns.push(new VyTableColumn('שם איש קשר', 'nvContact'))
    this.lstColumns.push(new VyTableColumn('תפקיד', 'nvRoleType'))
    this.lstColumns.push(new VyTableColumn('מייל', 'nvEmail'))
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'))
    //להוסיף עמודה של תפקיד
    this.appProxy.post('GetAllYeshivot').then(data => {
      this.yeshivaList = data;
      this.yeshivaList.forEach(y=> y['edit'] = '<div class="edit"></div>')
    });
  }

  public editYeshiva(yeshiva) {
    this.iYeshivaId = yeshiva.iYeshivaId;
  }

  cancel() {
    this.yeshiva = null;
  }
  tableToExcel(){
    this.yeshivot.tableToExcel();
  }
}