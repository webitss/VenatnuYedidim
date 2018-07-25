import { Component, OnInit } from '@angular/core';
import { SysTableService } from '../../services/sys-table.service';
import { error } from 'util';
import { SysTableRow } from '../../classes/SysTableRow';
import { SysTables } from '../../classes/SysTables';

@Component({
  selector: 'app-settings-code-tables',
  templateUrl: './settings-code-tables.component.html',
  styleUrls: ['./settings-code-tables.component.css']
})
export class SettingsCodeTableComponent implements OnInit {

  protected tableNames: Array<SysTables>;
  protected Values: Array<SysTableRow>;
  
  protected id: number;
 protected divNewValue:boolean;
  protected toEdit:boolean;
  protected row:SysTableRow;
  protected roeToadd:SysTableRow=new SysTableRow();
  protected lstColumns = [{
    title: 'עריכה',
    type: 'html',
    clickCell: true 
  },
  {
    title: 'ערך',
    name: 'nvValue'
  }]
  constructor(private sysTableService: SysTableService) { }

  ngOnInit() {

    

    this.sysTableService.getTableNames().then(data => this.tableNames = data, error => alert(error));

  }
 public getValues() {


alert(this.id);
    this.sysTableService.getValues(this.id).then(data => {
      if (data) this.Values = data as Array<SysTableRow>;
      else alert(error)
    });
    console.log(this.Values);
  }
  public cell(myRow:SysTableRow){
    
  
    this.row=myRow;
  
   this.toEdit=true;
   
  }
  save(){
  
    this.toEdit=false;
   
    this.sysTableService.editValue(this.row);
    

  }
  saveNeeValue(){

    
this.roeToadd.dtLastModifyDate=new Date();
    this.roeToadd.dtCreateDate=new Date();
    
    this.roeToadd.iSysTableId=this.id;
    return this.sysTableService.addValue(this.roeToadd);
  }
}
