import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { VyTableColumn } from './vy-table.classes';
import { VyTableOrderByPipe, OrderByPipe } from './vy-table-order-by.pipe';
import { AppProxy } from '../../services/app.proxy';


@Component({
  selector: 'app-vy-table',
  templateUrl: './vy-table.component.html',
  styleUrls: ['./vy-table.component.css']
})
export class VyTableComponent implements OnInit {

  protected Math = Math
  protected currentPage: number = 0;
  protected iCountRows = 25;
  protected iStartNumRow = 0;
  protected iEndNumRow = 0;
  protected countPagesDisplayed = 5;
  protected lstPagesNum: Array<number> = new Array<number>();
  protected lstSortColumns:any={};

  @Input()
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  @Input()
  public lstDataRows: Array<any>;
  protected lstCurrentDataRows: Array<any>;
  @Output()
  public clickCell: EventEmitter<any> = new EventEmitter<any>();

  private lstOrderByFields: Array<any>

  constructor(private appProxy: AppProxy) {
    this.lstOrderByFields = new Array<any>();
    // this.lstOrderByFields.push({'aa': 'number'})
    // this.lstOrderByFields.push('-bb')
    // this.lstPagesNum = new Array<number>();
  }

  public ngOnInit() {

  }

  ngOnChanges() {
    if (this.lstDataRows && this.lstDataRows.length > 0) {
      this.currentPage = -1;
      this.moveToPage(0);
    }
  }

  ngDoCheck() {
    if (this.lstDataRows && this.lstDataRows.length > 0 && this.lstCurrentDataRows == null) {
      this.ngOnChanges();
    }
  }

  filterChange(col) {
    this.lstCurrentDataRows = this.lstDataRows.filter(row => row[col.name].indexOf(col.filter) > -1);
    this.moveToPage(0);
  }
  sortTable(sight,colName)
  {
    let dir=sight>0?'':'-';
    this.lstSortColumns[colName]=sight;
    
    if(sight!=0)
    {
      let lst =Object.assign(this.lstDataRows);
      this.lstCurrentDataRows = new VyTableOrderByPipe().transform(lst,[dir+colName]);
     // this.moveToPage(this.currentPage,true);
    }
    else
      this.moveToPage(this.currentPage,true);
  }

  public moveToPage(pageNum: number, move = false) {
    if (move || !(pageNum == this.currentPage || pageNum < 0 || (this.iEndNumRow == this.lstDataRows.length && pageNum > this.currentPage))) {
      this.lstCurrentDataRows = this.lstDataRows.slice((pageNum) * this.iCountRows, (pageNum * this.iCountRows) + this.iCountRows);
      this.iStartNumRow = pageNum * this.iCountRows;
      this.iEndNumRow = this.iStartNumRow + this.lstCurrentDataRows.length;
      this.updateLstPagesNum();
    }
  }

  public updateLstPagesNum() {
    this.currentPage = Math.ceil(this.iStartNumRow / this.iCountRows);
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

  public clickCellFunc(item, colName) {
    item['columnClickName'] = colName;
    this.clickCell.emit(item);
  }


  private createTable() {
    let table = "<table id='avrechim' style='width: 100%; background-color:#f9e4b1; height: 500px;><thead><tr style='text-align: initial'>";
    this.lstColumns.forEach(column => {
      if (column.bExcel)
        table += "<th>" + column.title + "</th>";
    });
    table += "</tr></thead><tbody>";
    this.lstDataRows.forEach(dataRow => {
      table += "<tr style='text-align: initial'>";
      this.lstColumns.forEach(col => {
        if (col.bExcel)
          table += "<td>" + dataRow[col.name] + "</td>";
      });
      table += "</tr>";
    });
    table + "</tbody></table>"
    // debugger;
    return table;
  }

  public downloadExcel() {
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(eval('unescape(encodeURIComponent(s))')) }
      , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })
      }
    var ctx = { worksheet: name || 'Worksheet', table: this.createTable() }
    debugger;
    window.location.href = uri + base64(format(template, ctx))
  }
  public current_date = new Date();
  downloadPdf(componentName: string, type: string) {
    debugger;
    // let date:Date;
    // let d=new Date().getUTCFullYear()+"/"+new Date().getMonth();


    var dt = new Date();
    var mm = dt.getMonth() + 1;
    var dd = dt.getDate();
    var yyyy = dt.getFullYear();
    var format = dd + '/' + mm + '/' + yyyy

    //  var d = new Date().toLocaleDateString('dd/mm/yy');
    debugger;
    let header = "<div  style='direction: rtl;'><h1>ונתנו ידידים</h1><p style='direction: ltr;'>" + format + "</p><br/><br/><h2 style='text-align:center;'>טבלת " + componentName + "</h2></div>";
    let footer = "<div style='font-weight: bold;  '>סה\"\כ שורות: " + this.lstDataRows.length;
    this.appProxy.post('GeneratPdf', { headerHtml: header, bodyHtml: this.createTable(), footerHtml: footer })
      .then(res => {
        let binaryString = window.atob(res);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
          let ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        let file = type ? new Blob([bytes], { type: type }) : new Blob([bytes]);
        let link = document.createElement('a');
        link.setAttribute('id', 'linkDownload');
        link.href = window.URL.createObjectURL(file);
        link.download = componentName + (type ? '.' + type : '');
        link.click();
        try {
          document.getElementById('linkDownload').remove();
        } catch (e) {
          //Global_service.showMessage("הורדת הקובץ נכשלה", "fail");
          console.log(e);
        }
      })
  }
  // removeFromList(item){
  //   this.lstDataRows.splice(this.lstDataRows.indexOf(item),1);
  // }
  public refreshTable(newList) {
    this.lstDataRows = newList;
    this.moveToPage(this.currentPage, true);
  }
}