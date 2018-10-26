import { Component, OnInit, Output, Input, ViewChild, forwardRef, Inject } from '@angular/core';
import { SettingYeshivaComponent } from '../setting-yeshiva/setting-yeshiva.component';
import { Yeshiva } from '../../classes/Yeshiva';
import { Router } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { EventEmitter } from 'events';
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

  public yeshivaList: Array<Yeshiva> = new Array<Yeshiva>();
  public iYeshivaId: number;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  protected yeshiva: Yeshiva;
  protected iLastModifyUserId: number;
  public flag;
  @ViewChild('yeshivot') yeshivot: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  @Output()
  public closeYeshiva = new EventEmitter();

  public settingYeshivot: SettingYeshivaComponent;


  flagDelete=false;
  message='';
  header='מחיקת מוסד';
 
  @Output()
  protected sysTableList:SysTableRow[];
  
  constructor(private appProxy: AppProxy,private router:Router,private sysTableService:SysTableService,@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) { }
 



  ngOnInit() {

    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true,false))
    this.lstColumns.push(new VyTableColumn('מחיקה','delete','html',true,false))
    this.lstColumns.push(new VyTableColumn('שם מוסד', 'nvYeshivaName'))
    this.lstColumns.push(new VyTableColumn('כתובת ', 'nvAddress'))
    this.lstColumns.push(new VyTableColumn('עיר', 'nvCity'))
    this.lstColumns.push(new VyTableColumn('שם איש קשר', 'nvContact'))
    this.lstColumns.push(new VyTableColumn('מייל', 'nvEmail'))
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'))
    this.lstColumns.push(new VyTableColumn('תפקיד', 'nvRoleType'))

    
    // if (this.iYeshivaId == 0) {
    //   this.yeshiva = new Yeshiva();
    // }
    // else {
      this.appProxy.post("GetAllYeshivot", { iYeshivaId: this.iYeshivaId })
        .then(data => {
          this.yeshiva=data;
          //this.yeshivaList = data;
          //this.lstColumns = data;
          //this.selecList(this.iYeshivaId);
        })
    

    // this.appProxy.post('GetAllYeshivot').then(data => {
    //   this.yeshivaList = data;
    //   this.sysTableService.getValues(SysTableService.dataTables.roleType.iSysTableId).then(val=> {
    //     this.sysTableList=val;
    //     this.yeshivaList.forEach(y=> {
    //     this.changeTable(y);
    //     });
    //   });
    // });
    // this.selecList(this.iYeshivaId);

    //this.iYeshivaId=this.globalService.getUser()['iYeshivaId'];
  }

  changeTable(y: Yeshiva) {
    y['edit'] = '<div class="edit"></div>';
    y['delete'] = '<div class="delete"></div>';
    y['nvRoleType'] = this.sysTableList.filter(x => x.iSysTableRowId == y.iRoleType)[0].nvValue;
  }

  selecList(id) {
    this.sysTableService.getValues(SysTableService.dataTables.roleType.iSysTableId).then(val => {
      this.sysTableList = val;
      this.yeshivaList.forEach(y => {
        this.changeTable(y);
      });
    });
  }


  public setYeshiva(yeshiva) {
    if (yeshiva.columnClickName == 'edit')
      this.editYeshiva(yeshiva);
    else
      this.deleteYeshiva(yeshiva);
  }

  public editYeshiva(yeshiva) {
    this.iYeshivaId = yeshiva.iYeshivaId;
    this.flag = false;
  }

  public deleteYeshiva(yeshiva) {
    this.changeTable(yeshiva);
    this.iYeshivaId=yeshiva.iYeshivaId;
    this.flag=true;
    this.flagDelete=true;
    this.message='האם אתה בטוח שברצונך למחוק מוסד זה?';
    this.changeTable(yeshiva);
  }

  delete() {
    this.appProxy.post('DeleteYeshiva',{iYeshivaId:this.iYeshivaId,iLastModifyUserId:this.iLastModifyUserId})
    .then(
        data=>{
        this.yeshiva=data;
        this.iYeshivaId=null;
        this.flag=null;
        this.yeshivaList.splice(this.yeshivaList.indexOf(this.yeshiva),1);
        this.vyTableComponent.refreshTable(this.yeshivaList);  
        this._parent.openMessagePopup('הישיבה נמחקה בהצלחה!');
        //alert("הישיבה נמחקה בהצלחה");
        this.changeTable(this.yeshiva);
        //alert("הישיבה נמחקה בהצלחה");
    });  
    
  }

  close() {
    this.iYeshivaId = null;
    this.flag = null;
  }

  downloadExcel() {
    this.yeshivot.downloadExcel();
  }
}
