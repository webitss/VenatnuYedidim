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
  @ViewChild(NgForm) form;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  public listYeshivot: Yeshiva[];
  public settingsYeshivot: SettingsYeshivotComponent;


  formValid = false;

  isDisabled(): boolean {
    if (this.isDisabled)
      return this.form.valid;
  }


  

  constructor(private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService) { }

  changeTable(y: Yeshiva) {
    y['edit'] = '<div class="edit"></div>';
    y['delete'] = '<div class="delete"></div>';
    y['nvRoleType'] = this.sysTableList.filter(x => x.iSysTableRowId == y.iRoleType)[0].nvValue;
  }

  // selecList(id) {
  //   if (this.iYeshivaId == 0) {
  //     this.yeshiva = new Yeshiva();
  //   }
  //   else {
  //     this.appProxy.post("getYeshivaById", { iYeshivaId: id })
  //       .then(data => {
  //         this.yeshiva = data;
  //         this.settingsYeshivot.yeshivaList = data;
  //         this.sysTableService.getValues(SysTableService.dataTables.roleType.iSysTableId).then(val => {
  //           this.sysTableList = val;
  //           this.listYeshivot.forEach(y => {
  //             this.changeTable(y);
  //           });
  //         });
  //       })
  //   }
  // }

  ngOnInit() {
    if (this.iYeshivaId == 0) {
      this.yeshiva = new Yeshiva();
    }
    else {
      this.appProxy.post("getYeshivaById", { iYeshivaId: this.iYeshivaId })
        .then(data => {
           this.yeshiva = data;
          //this.settingsYeshivot.yeshivaList = data;
          //this.selecList(this.iYeshivaId);
        }
      )
    };
  }

  save(y: Yeshiva) {
    if (this.iYeshivaId == 0) {
      if (this.appProxy.post('AddYeshiva', { yeshiva: this.yeshiva })
        .then(
          data => {
            if (this.yeshiva.iRoleType == null)
              this.isDisabled();
            else {
              alert("save!");
              this.closeYeshiva.emit(null);
              this.changeTable(y);
              this.listYeshivot.push(y);
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
            //this.updateYeshiva(y);
          }
        )
      ) { }
      else
        alert("faild in save");
    }
  }

 


  cancel() {
    this.closeYeshiva.emit(null);
  }
}
