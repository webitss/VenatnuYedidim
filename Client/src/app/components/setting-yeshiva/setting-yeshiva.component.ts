import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import { ActivatedRoute, Router, ROUTER_CONFIGURATION } from '@angular/router'
import { FormArrayName, NgForm, Validator } from '@angular/forms'
// import { forEach } from '@angular/router/src/utils/collection';
// import { element } from 'protractor';
// import { EMLINK } from 'constants';
import { SettingsYeshivotComponent } from '../settings-yeshivot/settings-yeshivot.component';
import { SysTableRow } from '../../classes/SysTableRow';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { } from '../../components/settings-yeshivot/settings-yeshivot.component';


@Component({
  selector: 'app-setting-yeshiva',
  templateUrl: './setting-yeshiva.component.html',
  styleUrls: ['./setting-yeshiva.component.css']
})

export class SettingYeshivaComponent implements OnInit {

  @Output()
  public closeYeshiva = new EventEmitter();
  @Input()
  public iYeshivaId: number;
  @Input()
  public sysTableList: SysTableRow[];
  public yeshiva: Yeshiva = new Yeshiva();
  @ViewChild(NgForm) form;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  public listYeshivot:Yeshiva[];


  formValid = false;

  isDisabled(): boolean {
    if (this.isDisabled)
      return this.form.valid;
  }

  constructor(private appProxy: AppProxy, private router: Router) { }

  changeTable(y: Yeshiva) {
    y['edit'] = '<div class="edit"></div>';
    y['delete'] = '<div class="delete"></div>';
    y['nvRoleType']=this.sysTableList.filter(x=>x.iSysTableRowId==y.iRoleType)[0].nvValue;
  }

  ngOnInit() {
    if(this.iYeshivaId == 0){
      this.yeshiva = new Yeshiva();
    }
    else
      this.appProxy.post('getYeshivaById', { iYeshivaId: this.iYeshivaId })
        .then(
          data => {
            this.yeshiva = data;
          }
        );
        this.changeTable(this.yeshiva);
  }

  save() {
    if (this.iYeshivaId == 0) {
      if(this.appProxy.post('AddYeshiva', { yeshiva: this.yeshiva })
        .then(
          data => {
            if (this.yeshiva.iRoleType == null)
                this.isDisabled();
            else {
              this.closeYeshiva.emit(null);
              alert("save!");
            }
          }
        )
      )
      {}
      else{
        alert("faild in save");
      }
    }
    else {
      if(this.appProxy.post('EditYeshiva', { yeshiva: this.yeshiva, iYeshivaId: this.yeshiva.iYeshivaId })
        .then(
          data => {
            this.yeshiva = data;
            this.closeYeshiva.emit(null);
            alert("save!");
          }
        )
      ){}
      else
        alert("faild in save");
    }
    this.vyTableComponent.refreshTable(this.yeshiva);
    this.changeTable(this.yeshiva);
  }

  cancel() {
    this.closeYeshiva.emit(null);
  }
}
