import { Component, OnInit } from '@angular/core';
import { SysTableService } from '../../services/sys-table.service';
import { error } from 'util';

@Component({
  selector: 'app-settings-code-tables',
  templateUrl: './settings-code-tables.component.html',
  styleUrls: ['./settings-code-tables.component.css']
})
export class SettingsCodeTableComponent implements OnInit {

  tableNames: string[];
  constructor(private sysTableService: SysTableService) { }

  ngOnInit() {

    this.sysTableService.getTableNames().then(data=>this.tableNames=data,error=>alert(error) );
  }
  getValues1(id:number){
   
this.sysTableService.getValues(id);
  }
  getValues(id:number){
    console.log("jjjjjjjjjjjjjj");
    this.sysTableService.getValues(id);
  }
  
}
