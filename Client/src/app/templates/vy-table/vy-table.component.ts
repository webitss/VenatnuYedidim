import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { VyTableColumn } from './vy-table.classes';
import { VyTableOrderByPipe, OrderByPipe } from './vy-table-order-by.pipe';

@Component({
  selector: 'app-vy-table',
  templateUrl: './vy-table.component.html',
  styleUrls: ['./vy-table.component.css']
})
export class VyTableComponent implements OnInit {

  protected iCountRows = 2;
  protected countPagesDisplayed = 5;
  protected iStartNumRow = 0;
  protected iEndNumRow = 0;
  protected lstPagesNum: Array<number> = new Array<number>();

  @Input()
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  @Input()
  public lstDataRows: Array<any> = new Array<any>();
  protected lstCurrentDataRows: Array<any> = new Array<any>();
  @Output()
  public clickCell: EventEmitter<any> = new EventEmitter<any>();

  private lstOrderByFields: Array<any>
  private table: string;
  constructor() {
    this.lstOrderByFields = new Array<any>();
    // this.lstOrderByFields.push({'aa': 'number'})
    // this.lstOrderByFields.push('-bb')
    this.lstPagesNum = new Array<number>();
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

  ngOnInit() {
    // setTimeout(() => {
    //   this.lstDataRows = this.lstDataRows.concat(this.lstDataRows)
    //   this.lstDataRows = this.lstDataRows.concat(this.lstDataRows)
    // }, 1000)
  }

  moveToPage(pageNum: number) {
    if (!(pageNum == this.currentPage || pageNum < 0 || (this.iEndNumRow == this.lstDataRows.length && pageNum > this.currentPage))) {
      this.lstCurrentDataRows = this.lstDataRows.slice((pageNum) * this.iCountRows, (pageNum * this.iCountRows) + this.iCountRows);
      this.iStartNumRow = pageNum * this.iCountRows;
      this.iEndNumRow = this.iStartNumRow + this.lstCurrentDataRows.length;
      this.updateLstPagesNum();
    }
  }

  protected currentPage: number = 0;
  updateLstPagesNum() {
    this.currentPage = (this.iStartNumRow / this.iCountRows);
    this.currentPage = this.currentPage < 0 ? 0 : this.currentPage;

    this.lstPagesNum = [this.currentPage];
    for (let i = 1; i < (this.countPagesDisplayed / 2); i++) {
      if ((this.currentPage + i) < (this.lstDataRows.length / this.iCountRows))//next
        this.lstPagesNum.push(this.currentPage + i);
      if ((this.currentPage - i) >= 0)//prev
        this.lstPagesNum.push(this.currentPage - i);
    }
    this.lstPagesNum = new OrderByPipe().transform(this.lstPagesNum);
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


}
