import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { VyTableColumn } from './vy-table.classes';

@Component({
  selector: 'app-vy-table',
  templateUrl: './vy-table.component.html',
  styleUrls: ['./vy-table.component.css']
})
export class VyTableComponent implements OnInit {

  @Input()
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  @Input()
  public lstDataRows: Array<any> = new Array<any>();
  @Output()
  public clickCell: EventEmitter<any> = new EventEmitter<any>();

  private lstOrderByFields: Array<any>
  private table: string;
  constructor() {
    this.lstOrderByFields = new Array<any>();
    // this.lstOrderByFields.push({'aa': 'number'})
    // this.lstOrderByFields.push('-bb')
  }

  clickCellFunc(item) {
    this.clickCell.emit(item);
  }
  createTableFromData() {
    let table = "<table><thead><tr>";
    this.lstColumns.forEach(column => {
      if (column.bExcel)
        table += "<th>" + column.title + "</th>";
    });
    table += "</tr></thead><tbody>";
    this.lstDataRows.forEach(dataRow => {
      table += "<tr>";
      this.lstColumns.forEach(col => {
        if (col.bExcel)
          table += "<td>" + dataRow[col.name] + "</td>";
      });
      table += "</tr>";
    });
    table += "</tbody></table>";
    return table;
    // return document.getElementById('tId').innerHTML
  }

  public tableToExcel() {
    debugger;
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns="http://www.w3.org/TR/REC-html40">
          <head>
            <meta http-equiv="content-type" content="text/plain; charset=utf-8"/>
            <!--[if gte mso 9]><xml>
            <x:ExcelWorkbook>
            <x:ExcelWorksheets>
            <x:ExcelWorksheet>
            <x:Name>{worksheet}</x:Name>
            <x:WorksheetOptions>
            <x:DisplayGridlines/>
            </x:WorksheetOptions>
            </x:ExcelWorksheet>
            </x:ExcelWorksheets>
            </x:ExcelWorkbook>
            </xml>
            <![endif]-->            
          </head>
          <body>
            <table>{table}</table>
          </body>
          </html>`
      , base64 = function (s) {
        return window.btoa(decodeURIComponent(encodeURIComponent(s)))
      }
      , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })       
      }

    var ctx = { worksheet: name || 'Worksheet', table: this.createTableFromData() }
    window.location.href = uri + base64(format(template, ctx))
  }

  ngOnInit() {

  }

}
