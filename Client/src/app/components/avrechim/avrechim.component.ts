import { Component, OnInit,ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AvrechComponent } from '../avrech/avrech.component';

import {Avrech} from '../../classes/avrech';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router } from '@angular/router';
import { viewClassName } from '../../../../node_modules/@angular/compiler';



@Component({
  selector: 'app-avrechim',
  templateUrl: './avrechim.component.html',
  styleUrls: ['./avrechim.component.css']
})
export class AvrechimComponent implements OnInit {

 avrech:Avrech
   avrechimList:Avrech[];
   @ViewChild('avrechim') avrechim:any;
   protected currentComponent:any;
   public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  constructor(private router: Router,private appProxy:AppProxy) { }

  ngOnInit() {

   
    this.appProxy.post("GetAllAvrechim",{iPersonId:null}).then(
      data=>
      {
    this.avrechimList=data;
    this.avrechimList.forEach(
      
      a => {
         a['open'] = '<div class="edit"></div>'; 
        });
 

    },
    );

    this.lstColumns.push(new VyTableColumn('פתיחה', 'open', 'html', true,false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));   
  }
  editAvrech(e) {
        this.router.navigate(['avrechim/avrech/',e.iPersonId])
  }
  // tableToExcel(t) {
  //   let uri = 'data:application/vnd.ms-excel;base64,'
  //   , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
  //   , base64 = function(s) { return window.btoa(eval('unescape(encodeURIComponent(s))')) }
  //     , format = function (s, c) {
  //       return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })
  //     }
  //     if (!t.nodeType) t = document.getElementById(t)
  //     var ctx = {worksheet: name || 'Worksheet', table: t.innerHTML}
  //   debugger;
  //   window.location.href = uri + base64(format(template, ctx))
  //  }
  tableToExcel(t){
    debugger;
    this.avrechim.tableToExcel(t);
  }
  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }
}
