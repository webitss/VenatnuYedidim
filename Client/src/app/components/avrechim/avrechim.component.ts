import { Output,EventEmitter,Component, OnInit,ViewChild } from '@angular/core';
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
         a['delete'] = '<div class="delete"></div>'; 
        });
 

    },
    );

    this.lstColumns.push(new VyTableColumn('פתיחה', 'open', 'html', true,false));
    this.lstColumns.push(new VyTableColumn('מחיקה', 'delete', 'html', true,false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));   
  }
  click(e)
  {
    
    if(e.columnClickName=="open")
    this.editAvrech(e);
    else
    this.deleteAvrech(e);
  }
  editAvrech(e) {
        this.router.navigate(['avrechim/avrech/',e.iPersonId])
  }
  deleteAvrech(e)
  {
    this.appProxy.post('DeleteAvrech', e)
    .then(result => {
      if (result) { alert('שמירת הקובץ התבצעה בהצלחה'); } else { alert('שמירת הקובץ נכשלה'); }
    });
  }

  downloadExcel(t){
    debugger;
    this.avrechim.downloadExcel(t);
  }
  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }
  tableToPdf(name:string){
this.avrechim.downloadPdf(name,'pdf');
  }
}
