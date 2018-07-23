import { Component, OnInit } from '@angular/core';
import { SysTableService } from '../../services/sys-table.service';
import { error } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { SysTables } from '../../classes/SysTables';
import { SysTableRow } from '../../classes/SysTableRow';

@Component({
  selector: 'app-settings-code-tables',
  templateUrl: './settings-code-tables.component.html',
  styleUrls: ['./settings-code-tables.component.css']
})
export class SettingsCodeTableComponent implements OnInit {

  protected tableNames: Array<SysTables>;
  protected Values: Array<SysTableRow>;
  protected id: number;
  protected lstColumns = [{
    title: 'עריכה',
     
  },
  {
    title: 'ערך',
    name: 'nvValue'
  }]
  constructor(private sysTableService: SysTableService) { }

  ngOnInit() {

    

    this.sysTableService.getTableNames().then(data => this.tableNames = data, error => alert(error));

  }
  getValues() {



    this.sysTableService.getValues(this.id).then(data => {
      if (data) this.Values = data as Array<SysTableRow>;
      else alert(error)
    });
    console.log(this.Values);
  }


}
