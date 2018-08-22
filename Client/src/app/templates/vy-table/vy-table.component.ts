import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { VyTableColumn } from './vy-table.classes';

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
  }

  clickCellFunc(item) {
    this.clickCell.emit(item);
  }
  createTableFromData() {
    //  let table = "<table><thead><tr><th>מוטי</th></tr></thead><tbody><tr><td>ראובני</td></tr></tbody></table>";
    
  }
createTableForPdf(componentName){
  let sheet="<div><h1>ונתנו ידידים</h1><br/><br/><h2>טבלת "+componentName+"</h2></div>"
  sheet+= "<table id='avrechim' style='width: 100%; background-color:#f9e4b1; height: 500px;><thead><tr style='text-align: initial'>";
    this.lstColumns.forEach(column => {
      if (column.bExcel)
        sheet += "<th>" + column.title + "</th>";
    });
    sheet += "</tr></thead><tbody>";
    this.lstDataRows.forEach(dataRow => {
      sheet += "<tr style='text-align: initial'>";
      this.lstColumns.forEach(col => {
        if (col.bExcel)
          sheet += "<td>" + dataRow[col.name] + "</td>";
      });
      sheet += "</tr>";
    });
    sheet += "</tbody></table><div style='font-weight: bold; background-color: #f7c853 '>סה\"\כ שורות: "+this.lstDataRows.length;
    // debugger;
    return sheet;
}
  ngOnInit() {

  }

  moveToPage(pageNum: number) {
    this.lstCurrentDataRows = this.lstDataRows.slice((pageNum - 1) * this.iCountRows, (pageNum * this.iCountRows) + this.iCountRows);
    this.iStartNumRow = pageNum * this.iCountRows;
    this.iEndNumRow = this.iStartNumRow + this.lstCurrentDataRows.length;
    this.updateLstPagesNum();
  }

  moveToNextPage() {
    this.lstCurrentDataRows = this.lstDataRows.slice(this.iEndNumRow, this.iEndNumRow + this.iCountRows);
    this.iStartNumRow = this.iEndNumRow;
    this.iEndNumRow = this.iEndNumRow + this.lstCurrentDataRows.length;
    this.updateLstPagesNum();
  }

  moveToPrevPage() {
    this.lstCurrentDataRows = this.lstDataRows.slice((this.iStartNumRow - this.iCountRows) < 0 ? 0 : (this.iStartNumRow - this.iCountRows), this.iStartNumRow);
    this.iStartNumRow = (this.iStartNumRow - this.iCountRows) < 0 ? 0 : (this.iStartNumRow - this.iCountRows);
    this.iEndNumRow = this.iStartNumRow + this.lstCurrentDataRows.length;
    this.updateLstPagesNum();
  }

  updateLstPagesNum() {
    let currentPage = (this.iStartNumRow / this.iCountRows) + 1;
    this.lstPagesNum = [currentPage];
    for (let i = 1; i < (this.countPagesDisplayed / 2); i++) {
      if ((currentPage + i) < (this.lstDataRows.length / this.iCountRows))//next
        this.lstPagesNum.push(currentPage + i);
      if ((currentPage - i) > 0)//prev
        this.lstPagesNum.push(currentPage - i);
    }
    // this.lstPagesNum //order by
  }
  // downloadFile() {
  //   let url = AppProxy.baseUrl + 'Files/excelfilesForExample/' + EXCEL_FILES_NAME[this.game.nvLanguage].clickerGroups + '.xlsx';
  //   let name = "קליקרים לקבוצות";
  //   let type = "xlsx";
  //   this.servGlobal.downloadFile(url, name, type);
  // }
  // downloadFile(url: string, name: string, type: string) {
  //       console.log(url);
  //       this.toDataUrl(url, function (base64) {
  //           let data = base64.split(',')[1];
  //           let binaryString = window.atob(data);
  //           let binaryLen = binaryString.length;
  //           let bytes = new Uint8Array(binaryLen);
  //           for (let i = 0; i < binaryLen; i++) {

  //               let ascii = binaryString.charCodeAt(i);
  //               bytes[i] = ascii;
  //           }
  //           data = bytes;
  
  //           let file = type ? new Blob([data], { type: type }) : new Blob([data]);
  //           let link = document.createElement('a');
  //           link.setAttribute('id', 'linkDownload');
  //           link.href = window.URL.createObjectURL(file);
  //           link.download = name + (type ? '.' + type : '');
  //           link.click();
  //           try {
  //               document.getElementById('linkDownload').remove();
  //           } catch (e) {
  //               //Global_service.showMessage("הורדת הקובץ נכשלה", "fail");
  //               console.log(e);
  //           }
  
  //       });
  //   }

  public tableToExcel() {
    let uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(eval('unescape(encodeURIComponent(s))')) }
      , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })
      }
    var ctx = { worksheet: name || 'Worksheet', table: this.createTableFromData()}
    debugger;
    window.location.href = uri + base64(format(template, ctx))
  }
}


