import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import { ActivatedRoute, Router, ROUTER_CONFIGURATION } from '@angular/router'
import { FormArrayName, NgForm, Validator } from '@angular/forms'
// import { forEach } from '@angular/router/src/utils/collection';
// import { element } from 'protractor';
// import { EMLINK } from 'constants';
import { SettingsYeshivotComponent } from '../settings-yeshivot/settings-yeshivot.component';
import { SysTableService } from '../../services/sys-table.service'
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
  protected yeshivaList = new Array();
  protected isNew = false;
  protected header="";

  @ViewChild(NgForm) form;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;

  protected settingsYeshivot: SettingsYeshivotComponent;


  formValid = false;

  isDisabled(): boolean {
    if (this.isDisabled)
      return this.form.valid;
  }

  constructor(private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService) { }


  ngOnInit() {
    if (this.iYeshivaId == 0) {
      this.yeshiva = new Yeshiva();
      this.isNew = true;
      this.header="מוסד חדש";
    }
    else {
      this.isNew = false;
      this.appProxy.post("getYeshivaById", { iYeshivaId: this.iYeshivaId })
        .then(data => {
          this.yeshiva = data;
          this.header=this.yeshiva.nvYeshivaName
          ;
        }
        )
    };
  }

  save() {
    if (this.iYeshivaId == 0) {
      if (this.appProxy.post('AddYeshiva', { yeshiva: this.yeshiva })
        .then(
          data => {
            if (this.yeshiva.iRoleType == null)
              this.isDisabled();
            else {
              alert("save!");
              this.closeYeshiva.emit(null);
              this.settingsYeshivot.changeTable(this.yeshiva);
              this.addYeshiva(this.yeshiva);
              this.vyTableComponent.refreshTable(this.yeshivaList);
            }
          }
        )
      ) { }
      else {
        alert("faild in save");
      }
    }
    else {
      if (this.appProxy.post('EditYeshiva', { yeshiva: this.yeshiva, iYeshivaId: this.yeshiva.iYeshivaId })
        .then(
          data => {
            this.yeshiva = data;
            alert("save!");
            this.closeYeshiva.emit(null);
            this.updateYeshiva(this.yeshiva);
          }
        )
      ) { }
      else
        alert("faild in save");
    }
  }

  addYeshiva(yeshiva: Yeshiva) {
    this.yeshivaList.push(yeshiva);
  }


  updateYeshiva(y: Yeshiva) {
    let l = this.yeshivaList.indexOf(this.yeshivaList.find(y1 => y1.iYeshivaId == y.iYeshivaId))
    this.settingsYeshivot.changeTable(y);
    this.yeshivaList[l] = this.yeshiva;
    this.vyTableComponent.refreshTable(this.yeshivaList);
  }


  cancel() {
    this.closeYeshiva.emit(null);
  }
}
