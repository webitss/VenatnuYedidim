import { Component, OnInit } from '@angular/core';
import { SettingYeshivaComponent } from '../setting-yeshiva/setting-yeshiva.component';
import { Yeshiva } from '../../classes/Yeshiva';
// import { RouterLink } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';

@Component({
  selector: 'app-settings-yeshivot',
  templateUrl: './settings-yeshivot.component.html',
  styleUrls: ['./settings-yeshivot.component.css']
})


export class SettingsYeshivotComponent implements OnInit {

  protected yeshivaList: Array<Yeshiva> = new Array<Yeshiva>();
  protected iYeshivaId: number;
  protected lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  constructor(private appProxy: AppProxy) { }


  ngOnInit() {

    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true))
    this.lstColumns.push(new VyTableColumn('שם מוסד', 'nvYeshivaName'))
    this.lstColumns.push(new VyTableColumn('כתובת ', 'nvAddress'))
    this.lstColumns.push(new VyTableColumn('עיר', 'nvCity'))
    this.lstColumns.push(new VyTableColumn('שם איש קשר', 'nvContact'))
    this.lstColumns.push(new VyTableColumn('תפקיד', 'nvRoleType'))
    this.lstColumns.push(new VyTableColumn('מייל', 'nvEmail'))
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'))

    this.appProxy.post('GetAllYeshivot').then(data => {
      this.yeshivaList = data;
      this.yeshivaList.forEach(y=> y['edit'] = '<span>עריכה</span>')
    });

  }

  public editYeshiva(yeshiva) {
    this.iYeshivaId = yeshiva.iYeshivaId;
  }
}
