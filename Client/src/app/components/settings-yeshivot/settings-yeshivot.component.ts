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
<<<<<<< HEAD
import { GlobalService } from '../../services/global.service'
=======
<<<<<<< HEAD
import { GlobalService } from '../../services/global.service'
=======
>>>>>>> 94d7dc89c2de802a49a37fb8a2e45840ed6b9300
import { AppComponent } from '../app/app.component';
>>>>>>> 536dc29d8e3ee6b609be78b697514fd4fd5cbb2b

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


<<<<<<< HEAD
  @Output()
  protected sysTableList: SysTableRow[];

  // @Input()
  // public lstColumnss = [
  //   {
  //     title: '',
  //     name: 'edit',
  //     bClickCell: true,
  //     type: 'html'
  //   },
  //   {
  //     title: '',
  //     name: 'delete',
  //     bClickCell: true,
  //     type: 'html'
  //   },
  //   {
  //     title: 'שם מוסד',
  //     name: 'nvYeshivaName',
  //   },
  //   {
  //     title: 'כתובת',
  //     name: 'nvAddress'
  //   },
  //   {
  //     title: 'עיר',
  //     name: 'nvCity'
  //   },
  //   {
  //     title: 'שם איש קשר',
  //     name: 'nvContact'
  //   },
  //   {
  //     title: 'מייל',
  //     name: 'nvEmail'
  //   },
  //   {
  //     title: 'נייד',
  //     name: 'nvMobile'
  //   },
  //   {
  //     title: 'תפקיד',
  //     name: 'nvRoleType'
  //   },
  // ];
  // public lstDataRows = [];


  constructor(private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService,
    private globalService: GlobalService) { }
=======
  flagDelete=false;
  message='';
  header='מחיקת מוסד';
 
  @Output()
  protected sysTableList:SysTableRow[];
  
  constructor(private appProxy: AppProxy,private router:Router,private sysTableService:SysTableService,@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) { }
 
<<<<<<< HEAD

=======
  changeTable(y: Yeshiva) {
    y['edit'] = '<div class="edit"></div>';
    y['delete'] = '<div class="delete"></div>';
    y['nvRoleType']=this.sysTableList.filter(x=>x.iSysTableRowId==y.iRoleType)[0].nvValue;
  }
>>>>>>> 536dc29d8e3ee6b609be78b697514fd4fd5cbb2b
>>>>>>> 94d7dc89c2de802a49a37fb8a2e45840ed6b9300


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
<<<<<<< HEAD
    this.iYeshivaId = yeshiva.iYeshivaId;
    this.flag = true;
  }

  delete(y: Yeshiva) {
    this.appProxy.post('DeleteYeshiva', { iYeshivaId: this.iYeshivaId, iLastModifyUserId: this.iLastModifyUserId })
      .then(
        data => {
          this.yeshiva = data;
          this.iYeshivaId = null;
          this.flag = null;
          this.yeshivaList.splice(this.yeshivaList.indexOf(y), 1);
          this.vyTableComponent.refreshTable(this.yeshivaList);
          this.changeTable(this.yeshiva);
          alert("הישיבה נמחקה בהצלחה");
        });

=======
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
    
>>>>>>> 536dc29d8e3ee6b609be78b697514fd4fd5cbb2b
  }

  close() {
    this.iYeshivaId = null;
    this.flag = null;
  }

  downloadExcel() {
    this.yeshivot.downloadExcel();
  }
}
