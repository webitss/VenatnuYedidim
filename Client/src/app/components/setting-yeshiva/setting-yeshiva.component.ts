import { Component, OnInit, Output, Input, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Yeshiva } from '../../classes/Yeshiva';
import { ActivatedRoute, Router, ROUTER_CONFIGURATION } from '@angular/router'
import { FormArrayName, NgForm, Validator } from '@angular/forms'
import { SettingsYeshivotComponent } from '../settings-yeshivot/settings-yeshivot.component';
import { SysTableService } from '../../services/sys-table.service'
import { SysTableRow } from '../../classes/SysTableRow';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { } from '../../components/settings-yeshivot/settings-yeshivot.component';
import { GlobalService } from '../../services/global.service';
import { AppComponent } from '../app/app.component';


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

  @Output() update = new EventEmitter<Yeshiva>();
  @Output() add = new EventEmitter<Yeshiva>();

  protected settingsYeshivot: SettingsYeshivotComponent;

  private sub: any;

  formValid = false;

  isDisabled(): boolean {
    debugger;
    //if (this.isDisabled)
      return this.form.valid;
  }

  constructor(@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent,private appProxy: AppProxy, private router: Router, private sysTableService: SysTableService,
    private globalService: GlobalService, private route: ActivatedRoute) { }


  ngOnInit() {
    if (this.iYeshivaId == 0) {
      this.yeshiva = new Yeshiva();
      this.yeshiva.iRoleType=this.sysTableList && this.sysTableList[0]?this.sysTableList[0].iSysTableRowId:null;
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
    // this.iYeshivaId = this.globalService.getUser()['iUserId'];
    // this.sub = this.route.parent.params.subscribe(params => {
    //   this.iYeshivaId = +params['iYeshivaId']
    //   this.yeshiva = new Yeshiva();
    //   this.yeshiva = Object.assign({}, this.yeshiva);
    // })
}

  save() {
    if (this.iYeshivaId == 0) {
      this.appProxy.post('AddYeshiva', { yeshiva: this.yeshiva })
        .then(
          data => {
            if(data>0)
            {
              
                this._parent.openMessagePopup("השמירה התבצעה בהצלחה");
                this.yeshiva.iYeshivaId=data;
                this.closeYeshiva.emit(null);
                this.add.emit(this.yeshiva);
            }
            else {
              this._parent.openMessagePopup("השמירה נכשלה!");
            }
          });
      
     
    }
    else {
      this.appProxy.post('EditYeshiva', { yeshiva: this.yeshiva, iYeshivaId: this.yeshiva.iYeshivaId })
        .then(
          data => {
            debugger;
            //this.yeshiva = data;
            if(data)
            {
              this._parent.openMessagePopup("השמירה התבצעה בהצלחה!");
              debugger;
              this.closeYeshiva.emit(null);
  debugger;
               this.update.emit(this.yeshiva);
            }
            else
            this._parent.openMessagePopup("השמירה נכשלה!");

          }
        )
       
     
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
