import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AvrechComponent } from '../avrech/avrech.component';

import {Avrech} from '../../classes/avrech';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router } from '@angular/router';
import { create } from 'domain';
import { createInjectable } from '../../../../node_modules/@angular/compiler/src/core';

@Component({
  selector: 'app-avrechim',
  templateUrl: './avrechim.component.html',
  styleUrls: ['./avrechim.component.css']
})
export class AvrechimComponent implements OnInit {

 avrech:Avrech
   avrechimList:Avrech[];
   public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  
  //  public lstColumns = [{
  //     title: 'פתיחה',
  //     name: 'open'
  //   }
  // ,{
  //   title: 'שם משפחה',
  //   name: 'nvLastName'
  // },
  // {
  //   title: 'שם פרטי',
  //   name: 'nvFirstName'
  // },
  // {
  //   title: 'טלפון',
  //   name: 'nvPhone'
  // },
  // {
  //   title: 'נייד',
  //   name: 'nvMobile'
  // },
  // {
  //   title: 'מייל',
  //   name: 'nvEmail'
  // }];
  // public lstDataRows = [{
    
  //   }];
  constructor(private router: Router,private appProxy:AppProxy,private renderer:Renderer2) { }

  ngOnInit() {

   
    this.appProxy.post("GetAllAvrechim",{iPersonId:null}).then(
      data=>
      {
    this.avrechimList=data;
    this.avrechimList.forEach(
      
      a => {
        debugger;
         a['open'] = '<p class="edit">ערוך</p>'; 
        });
 

    },
    );

    this.lstColumns.push(new VyTableColumn('פתיחה', 'open', 'html', true));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));

    
  }
  editAvrech(e) {
        this.router.navigate(['avrechim/avrech/',e.iPersonId])
  }
//   tableToExcel(AvrechimList){
//     debugger;
//     let uri = 'data:application/vnd.ms-excel;base64,'
//         , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>createTable()</table></body></html>'
//         , base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
//         , format = function(s,c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
           
//             var ctx = {worksheet: name || 'Worksheet', table: this.createTable(a)}
//             window.location.href = uri + base64(format(template, ctx))
//                 }
//     } 

// createTable(){
// this.renderer.createTable();
}