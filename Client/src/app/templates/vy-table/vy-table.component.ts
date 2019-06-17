import { Component, OnInit, Output, Input, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { VyTableColumn } from './vy-table.classes';
import { VyTableOrderByPipe, OrderByPipe } from './vy-table-order-by.pipe';
import { AppProxy } from '../../services/app.proxy';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// let jsPDF = require('jspdf');
import 'jspdf-autotable';
import { data } from 'jquery';
import * as moment from 'moment';
import { Task } from '../../classes/task';
import { EventParticipantsComponent } from '../../components/event-participants/event-participants.component';
import { debug } from 'util';
const EXCEL_EXTENSION = '.xlsx';
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
  protected lstSortColumns: any = {};
  protected lstFilterColumns: any = {};
  flag=false;

  @Input()
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();
  @Input()
  public lstDataRows: Array<any>;
  lstCurrentDataRows: Array<any>;
  @Output()
  public clickCell: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public changeOpt: EventEmitter<any> = new EventEmitter<any>();
  // @ViewChild(EventParticipantsComponent) child: EventParticipantsComponent;

  private lstOrderByFields: Array<any>

  constructor(private appProxy: AppProxy) {
    this.lstOrderByFields = new Array<any>();
    this.lstFilterColumns = {}

    // this.lstOrderByFields.push({'aa': 'number'})
    // this.lstOrderByFields.push('-bb')
    // this.lstPagesNum = new Array<number>();
  }

  public ngOnInit() {
    this.lstColumns.forEach(c => {
      debugger;
      this.lstFilterColumns[c.name] = null
      // alert(c.name);
    })
  }
  
 

  ngOnChanges() {
    // alert("ngOnChanges");
    if (this.lstDataRows && this.lstDataRows.length > 0) {
      this.currentPage = -1;
      this.moveToPage(0);
    }
  }

  ngDoCheck() {
  //  alert ("ngDoCheck")
    if (this.lstDataRows && this.lstDataRows.length > 0 && this.lstCurrentDataRows == null) {
      this.ngOnChanges();
    }
  }
  // const result = words.filter(word => word.length > 6);

  filterChange(col) {
    // alert("filterChange")
    // alert("come")
    this.flag=true;
    let lst = JSON.parse(JSON.stringify(this.lstDataRows));
    for (let key of Object.keys(this.lstFilterColumns)) {
      if (this.lstFilterColumns[key]) {
        debugger;
       //  lst[0].nvMobile.indexOf("5")>0
        lst = lst.filter(row => row[key].indexOf(this.lstFilterColumns[key]) > -1)
      }
    }
    this.lstCurrentDataRows = lst;
    // this.lstCurrentDataRows = this.lstDataRows.filter(row => row[col.name].indexOf(col.filter) > -1);
    this.moveToPage(0);
  }

  sortTable(sight, colName) {
    let dir = sight > 0 ? '' : '-';
    this.lstSortColumns[colName] = sight;

    if (sight != 0) {
      let lst = Object.assign(this.lstDataRows);
      this.lstCurrentDataRows = new VyTableOrderByPipe().transform(lst, [dir + colName]);
      // this.moveToPage(this.currentPage,true);
    }
    else
      this.moveToPage(this.currentPage, true);
  }

  checkAllTable(colName) {
    // alert("checkAllTable")
    debugger;
    if (this.lstDataRows.find(r => r[colName]) == null)
      this.lstDataRows.forEach(r => r[colName] = true);
    else if (this.lstDataRows.find(r => !r[colName]) == null)
      this.lstDataRows.forEach(r => r[colName] = false);
    else
      this.lstDataRows.forEach(r => r[colName] = this.lstDataRows[0][colName]);
    this.moveToPage(this.currentPage, true);
  }
  
  public moveToPage(pageNum: number, move = false) {
    //  alert("come");

    if (move || !(pageNum == this.currentPage || pageNum < 0 || (this.iEndNumRow == this.lstDataRows.length && pageNum > this.currentPage))) {
      this.lstCurrentDataRows = this.lstDataRows.slice((pageNum) * this.iCountRows, (pageNum * this.iCountRows) + this.iCountRows);
      this.iStartNumRow = pageNum * this.iCountRows;
      this.iEndNumRow = this.iStartNumRow + this.lstCurrentDataRows.length;
      this.updateLstPagesNum();
      // this.lstCurrentDataRows.forEach(row => {
      //   this.lstColumns.forEach(col => {
      //     debugger;
      //     row
      //   });
      // });
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
  public changeOptFunc(item,colName){

    item['columnClickName'] = colName;
this.changeOpt.emit(item);
  }
  private createTableToReport(tasks){
    var current;
    let table = "<table id='report' style='width: 100%; direction:rtl background-color:#f9e4b1; height: 500px;'><thead><tr style='text-align: initial'>";
   this.lstColumns.forEach(column => {
    if (column.bExcel && column.type!= 'checkbox' && column.type!= 'html')
      table += "<th>" + column.title + "</th>";
  });
  table += "</tr></thead><tbody>";
  
      tasks.forEach(t=>{

    table += "<tr style='text-align: initial'>";

      this.lstColumns.forEach(col => {
      table += "<td style='border-left:1px solid gainsboro;  border-bottom:1px solid gainsboro;'>" + t[col.name] + "</td>";
    });
    table += "</tr>";
  });
  table + "</tbody></table>"
 
  return table;

  }

  private createTable() {

    let table = "<table id='avrechim' style='width: 100%; direction:rtl background-color:#f9e4b1; height: 500px;'><thead><tr style='text-align: initial'>";
    this.lstColumns.forEach(column => {
      if (column.bExcel && column.type!= 'checkbox' && column.type!= 'html')
        table += "<th>" + column.title + "</th>";
    });
    table += "</tr></thead><tbody>";
    
    if(this.flag)
    {
      this.lstCurrentDataRows.forEach(dataRow => {


        table += "<tr style='text-align: initial'>";
        this.lstColumns.forEach(col => {
          if (col.bExcel && col.type!= 'checkbox' && col.type!= 'html')
            table += "<td style='border-left:1px solid gainsboro;  border-bottom:1px solid gainsboro;'>" + dataRow[col.name] + "</td>";
        });
        table += "</tr>";
      });
    }
    else{
          this.lstDataRows.forEach(dataRow => {
      
      table += "<tr style='text-align: initial'>";
      this.lstColumns.forEach(col => {
        if (col.bExcel && col.type!= 'checkbox' && col.type!= 'html')

          table += "<td style='border-left:1px solid gainsboro;  border-bottom:1px solid gainsboro;'>" + dataRow[col.name] + "</td>";
      });
      table += "</tr>";
    });
    }

    table + "</tbody></table>"
    //  
    return table;
  }

  public downloadExcel(tasksList?) {
    debugger;
    let uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"/><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(eval('unescape(encodeURIComponent(s))')) }
      , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })
      }
    var ctx;
    if(tasksList)
    {
          ctx={ worksheet: name || 'Worksheet', table: this.createTableToReport(tasksList) }

    }
    else
    ctx={ worksheet: name || 'Worksheet', table: this.createTable() }

   
    window.location.href = uri + base64(format(template, ctx))
  }

 
  public current_date = new Date();
  downloadPdf(componentName: string, type: string) {
    var format =moment(new Date()).format('YYYY/MM/DD HH:mm');

    //   //  var d = new Date().toLocaleDateString('dd/mm/yy');
    let header = "<div  style='direction: rtl;'><h1>ונתנו ידידים</h1><p style='direction: ltr;'>" + format + "</p><br/><br/><h2 style='text-align:center;'>טבלת " + componentName + "</h2></div>";
    let footer = "<div style='font-weight: bold;  '>סה\"\כ שורות: " + this.lstDataRows.length;
    let body = this.createTable();
    // let element = document.createElement('div');
    
    this.printToPDF(header + body + footer,componentName+'-'+format);
    //#region delete 2019.02.05??
//   //console.log("<meta charset='UTF-8'/>" +header + body + footer);
    // element.innerHTML = "<meta charset='UTF-8'/>" + header + body + footer;
    // element.id = 'linkDownload1';

    // var data = document.getElementById('myTable');
    // html2canvas(data).then(canvas => {
    //   //     // Few necessary setting options  

    //   var pdf = new jsPDF('p', 'pt', 'a4');


    //   // pdf.text("שכשדכשדכשדכ", 10, 10);
    //   //     //console.log(element);
    //   pdf.fromHTML(canvas, 10, 10);

    //   //pdf.addFont('../../../src/assets/fonts/RUBIK-REGULAR.TTF', 'Rubik', 'normal');


    //   //     // Or JavaScript:
    //   pdf.addFileToVFS('RUBIK-REGULAR.TTF', fontbase64);

    //   pdf.addFont('RUBIK-REGULAR.TTF', 'custom', 'normal');

    //   pdf.setFont('custom');
    //   pdf.setFontSize(18);
    //   //     //var imgData  = canvas.toDataURL("image/jpeg", 1.0);
    //   //     // pdf.addImage(imgData,0,0,canvas.width, canvas.height);
    //   pdf.save('converteddoc.pdf');
    // });






    // let doc = new jsPDF('p', 'pt', 'a4');
    // doc.addHTML(document.getElementById('linkDownload'),function(){
    //   doc.save("aaa.pdf");
    //   //document.getElementById('linkDownload').remove();
    // });
    // this.appProxy.post('GeneratPdf', { headerHtml: header, bodyHtml: this.createTable(), footerHtml: footer })
    //   .then(res => {


    //     // let binaryString = window.atob(res);

    //     // let binaryLen = binaryString.length;
    //     // let bytes = new Uint8Array(binaryLen);
    //     // for (let i = 0; i < binaryLen; i++) {
    //     //   let ascii = binaryString.charCodeAt(i);
    //     //   bytes[i] = ascii;
    //     // }
    //     // let file = type ? new Blob([bytes], { type: type }) : new Blob([bytes]);
    //     // let link = document.createElement('a');
    //     // link.setAttribute('id', 'linkDownload');
    //     // link.href = window.URL.createObjectURL(file);
    //     // link.download = componentName + (type ? '.' + type : '');
    //     // link.click();
    //     // try {
    //     //   document.getElementById('linkDownload').remove();
    //     // } catch (e) {
    //     //   //Global_service.showMessage("הורדת הקובץ נכשלה", "fail");
    //     //   console.log(e);
    //     // }
    //   })
    //}
    // removeFromList(item){
    //   this.lstDataRows.splice(this.lstDataRows.indexOf(item),1);
    //#endregion
    
  }
  public refreshTable(newList) {
    // alert("refreshTable")
    this.lstDataRows = newList;
    this.moveToPage(this.currentPage > 0 ? this.currentPage : 0, true);
  }

  printToPDF(body,title) {
    var string =
      '<DataTable xmlns="http://schemas.datacontract.org/2004/07/System.Data"><xs:schema id="NewDataSet" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"><xs:element name="NewDataSet" msdata:IsDataSet="true" msdata:MainDataTable="dt" msdata:UseCurrentLocale="true"><xs:complexType><xs:choice minOccurs="0" maxOccurs="unbounded"><xs:element name="dt"><xs:complexType><xs:sequence>';

    string +=
      '</xs:sequence></xs:complexType></xs:element></xs:choice></xs:complexType></xs:element></xs:schema><diffgr:diffgram xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"><DocumentElement xmlns="">';
    string += body;
    string += "</DocumentElement></diffgr:diffgram></DataTable>";
    this.PrintToPDF(string, title, "pdff")
      .then(res => {
        // var link = document.createElement("a");
        // link.download = AppProxy.getBaseUrl() + "Files/" + res;
        // link.href = AppProxy.getBaseUrl() + "Files/" + res;
        this.downloadFile(AppProxy.getBaseUrl() + "Files/" + res,title,'pdf');

        this.appProxy.post("DeleteFile",{fileName:res})
         //link.click();
        // window.open(AppProxy.getBaseUrl() + "Files/" + res);
      });
    //  }
  }

  PrintToPDF(body, title, filePath): Promise<any> {
    return this.appProxy
      .post("PrintToPDF", {
        body: body,
        title: title,
        // nvFilePath: filePath
      })

      .then(res => {
        return res;
      })
      .catch(err => {
        console.log("err-----" + err);
        return false;
      });
  }
  downloadFile(url: string, name: string, type: string) {
    console.log(url);
    this.toDataUrl(url, function (base64) {
        let data = base64.split(',')[1];
        let binaryString = window.atob(data);
        let binaryLen = binaryString.length;
        let bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        data = bytes;

        let file = type ? new Blob([data], { type: type }) : new Blob([data]);
        let link = document.createElement('a');
        link.setAttribute('id', 'linkDownload');
        link.href = window.URL.createObjectURL(file);
        link.download = name + (type ? '.' + type : '');
        link.click();
        try {
            document.getElementById('linkDownload').remove();
        } catch (e) {
            //Global_service.showMessage("הורדת הקובץ נכשלה", "fail");
            console.log(e);
        }

    });
}
  toDataUrl(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        let reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

}
