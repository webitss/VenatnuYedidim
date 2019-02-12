import { Component, OnInit, ViewChild, Output, forwardRef, Inject } from '@angular/core';
import { SysTableService } from '../../services/sys-table.service';
import { error } from 'util';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTables } from '../../classes/SysTables';
import { AppProxy } from '../../services/app.proxy';
import { forEach } from '@angular/router/src/utils/collection';
import { t } from '@angular/core/src/render3';
// import { EventEmitter } from 'protractor';
import { EventEmitter } from 'events'
import { DataSharingService } from '../../services/dataSharing.Service';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-settings-code-tables',
  templateUrl: './settings-code-tables.component.html',
  styleUrls: ['./settings-code-tables.component.css']
})
export class SettingsCodeTableComponent implements OnInit {
  @ViewChild(VyTableComponent) Vytable: VyTableComponent;
  public tableNames: Array<SysTables>;
  public Values: Array<SysTableRow>;

  public iSysTableId: number;
  public divNewValue: boolean;
  public toEdit: boolean;
  protected row: SysTableRow;
  protected roeToadd: SysTableRow = new SysTableRow();
  protected roeToadd1: SysTableRow = new SysTableRow();
  protected Mykey: string;
  public showOverlap: boolean;

  public lstColumns =
    [
    { title: '', name: 'edit', bClickCell: true, type: 'html' },
    { title: 'ערך', name: 'nvValue' }
    ]
  private readonly newProperty = this;
  @ViewChild('CodeTables') CodeTables: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;

  constructor(@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent, private sysTableService: SysTableService, private appProxy: AppProxy) {


  }

  ngOnInit() {

    this.sysTableService.getTableNames().then(data => {
      this.tableNames = data;
      this.iSysTableId = this.tableNames[0].iSysTableId;
      this.getValues();
    }
    );

  }
  public getValues() {

    this.sysTableService.getValues(this.iSysTableId).then(data => {
      if (data) {
         
        this.Values = data as Array<SysTableRow>;
        this.Values.forEach(v => {
          v['edit'] = '<div class="edit"></div>';
        
        });
        this.vyTableComponent.refreshTable(this.Values);
      }

      else
       this._parent.openMessagePopup("ארעה שגיאה בשליפה");
    });
    
  }

  public editSysTableRow(myRow: SysTableRow) {
    this.showOverlap = true;
    this.row =JSON.parse(JSON.stringify(myRow)) ;
    this.toEdit = true;
  }

  saveEditValue() {

    this.toEdit = false;
    this.showOverlap = false;
    this.sysTableService.editValue(this.row).then(res => {
      if (res) {
        Object.keys(SysTableService.dataTables).forEach(key => {
          if (SysTableService.dataTables[key].iSysTableId == this.iSysTableId) {
            this.Mykey = key;
          }
        });
        return this.appProxy.post("GetValues", { iSysTableId: this.iSysTableId })
          .then(l => {
            if (l) {

              SysTableService.dataTables[this.Mykey].SysTableRow = l;
              l.forEach(v => {
                v['edit'] = '<div class="edit"></div>';
              
              });
             this.vyTableComponent.refreshTable(l);
              this._parent.openMessagePopup('השמירה התבצעה בהצלחה!');
            }
            else
              console.log("err");
          });

      }
      else {
        this._parent.openMessagePopup('השמירה נכשלה!');
      }
    });


  }
  saveNewValue() {
    this.roeToadd.iSysTableId = this.iSysTableId;

   
    Object.keys(SysTableService.dataTables).forEach(key => {
      if (SysTableService.dataTables[key].iSysTableId == this.iSysTableId) {
        this.Mykey = key;

      }
    })
    return this.sysTableService.addValue(this.roeToadd)
      .then(res => {
        if (res) {
          SysTableService.dataTables[this.Mykey].SysTableRow.push(Object.assign({}, this.roeToadd));
          SysTableService.dataTables[this.Mykey].SysTableRow.forEach(element => {
            element['edit'] = '<div class="edit"></div>';
          });
          this.Vytable.refreshTable(SysTableService.dataTables[this.Mykey].SysTableRow)

          this.roeToadd = new SysTableRow();
          this.divNewValue = this.showOverlap = false;
          this._parent.openMessagePopup('השמירה התבצעה בהצלחה!');

        }
        else {
          this._parent.openMessagePopup('השמירה נכשלה!');
        }

      });


  }
  addNewValue() {
    this.divNewValue = true
    this.showOverlap = true
  }
  close() {
    this.divNewValue = false
    this.showOverlap = false
    this.toEdit = false;


  }


  downloadExcel() {
    this.CodeTables.downloadExcel();
  }
}
