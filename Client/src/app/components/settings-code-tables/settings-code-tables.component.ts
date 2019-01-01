import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { SysTableService } from '../../services/sys-table.service';
import { error } from 'util';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTables } from '../../classes/SysTables';
import { AppProxy } from '../../services/app.proxy';
import { forEach } from '@angular/router/src/utils/collection';
import { t } from '@angular/core/src/render3';
// import { EventEmitter } from 'protractor';
import {EventEmitter} from 'events'
import { DataSharingService } from '../../services/dataSharing.Service';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';

@Component({
  selector: 'app-settings-code-tables',
  templateUrl: './settings-code-tables.component.html',
  styleUrls: ['./settings-code-tables.component.css']
})
export class SettingsCodeTableComponent implements OnInit {
  @ViewChild(VyTableComponent) Vytable:VyTableComponent;
  public tableNames: Array<SysTables>;
  public Values: Array<SysTableRow>;

  public idSysTableRow: number;
  public divNewValue: boolean;
  public toEdit: boolean;
  protected row: SysTableRow;
  protected roeToadd: SysTableRow = new SysTableRow();
  protected roeToadd1: SysTableRow = new SysTableRow();
  protected Mykey: string;
  public showOverlap: boolean;
  
  public lstColumns = [{
   
    title: '',
    name: 'edit',
    bClickCell: true,
    type: 'html'
  },
  {
    title: 'ערך',
    name: 'nvValue'
   }
  //,{
  //   title: 'שם הטבלה',
  //   name: 'nvName'
  // }
]
  private readonly newProperty = this;
  @ViewChild('CodeTables') CodeTables:any;
 @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
   
  constructor(private sysTableService: SysTableService, private appProxy: AppProxy) { 
   

  }

  ngOnInit() {

    this.sysTableService.getTableNames().then(data => 
     
      this.tableNames = data,
     
     
    );

  }
  public getValues() {

    this.sysTableService.getValues(this.idSysTableRow).then(data => {

      if (data) {
        debugger;
        this.Values = data as Array<SysTableRow>;
        this.Values.forEach(v => {
          v['edit'] = '<div class="edit"></div>';
        });
        this.vyTableComponent.refreshTable(this.Values);
      }

      else alert(error)
    });
    console.log(this.Values);
  }
  public editSysTableRow(myRow: SysTableRow) {
    this.showOverlap = true;
    this.row = myRow;
    this.toEdit = true;
  }
  saveEditValue() {
  
    this.toEdit = false;
    this.showOverlap = false;
    this.sysTableService.editValue(this.row);
    Object.keys(SysTableService.dataTables).forEach(key => {
      if (SysTableService.dataTables[key].iSysTableId == this.idSysTableRow) {
        this.Mykey = key;
      }
    }
    )
    return this.appProxy.post("GetValues", { iSysTableId: this.idSysTableRow })

      .then(l => {
        if (l) {
          debugger;
          SysTableService.dataTables[this.Mykey].SysTableRow = l;
  
        }
        else
          console.log("err");
      }

      );

  }
  saveNeeValue() {
    
    this.roeToadd.dtLastModifyDate = new Date();
    this.roeToadd.dtCreateDate = new Date();
    this.roeToadd.iSysTableId = this.idSysTableRow;
   
  debugger;
    Object.keys(SysTableService.dataTables).forEach(key => {
      if (SysTableService.dataTables[key].iSysTableId == this.idSysTableRow) {
        this.Mykey = key;
      
      }
    })
 
debugger;
   
    return this.sysTableService.addValue(this.roeToadd)
      .then(res => {
   
        SysTableService.dataTables[this.Mykey].SysTableRow.push(Object.assign({}, this.roeToadd));
        debugger;
        let g=  this.Vytable.refreshTable(SysTableService.dataTables[this.Mykey].SysTableRow)
        this.Vytable.refreshTable(SysTableService.dataTables[this.Mykey].SysTableRow)

        this.roeToadd = new SysTableRow();
       
        
      });
      

  }
  addNewValue() {
    this.divNewValue = true
    this.showOverlap = true
  }
  close() {
    this.divNewValue = false
    this.showOverlap = false
    this.toEdit=false;

  
  }


  downloadExcel(){
    this.CodeTables.downloadExcel();
  }
}
