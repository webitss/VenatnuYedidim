import { Output, EventEmitter, Component, OnInit, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AvrechComponent } from '../avrech/avrech.component';

import { Avrech } from '../../classes/avrech';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router } from '@angular/router';
import { viewClassName } from '../../../../node_modules/@angular/compiler';



@Component({
  selector: 'app-avrechim',
  templateUrl: './avrechim.component.html',
  styleUrls: ['./avrechim.component.css']
})
export class AvrechimComponent implements OnInit {

  avrech: Avrech
  avrechimList: Avrech[];
 mailList:string[]=[];

  @ViewChild('avrechim') avrechim: any;
  protected currentComponent: any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  constructor(private router: Router, private appProxy: AppProxy) { }

  ngOnInit() {


    this.appProxy.post("GetAllAvrechim", { iPersonId: null }).then(
      data => {
        this.avrechimList = data;
        this.avrechimList.forEach(

          a => {
            a['open'] = '<div class="edit"></div>';
            a['delete'] = '<div class="delete"></div>';
          });


      },
    );

    this.lstColumns.push(new VyTableColumn('פתיחה', 'open', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('מחיקה', 'delete', 'html', true, false));
    this.lstColumns.push(new VyTableColumn('שם פרטי', 'nvFirstName'));
    this.lstColumns.push(new VyTableColumn('שם משפחה', 'nvLastName'));
    this.lstColumns.push(new VyTableColumn('טלפון', 'nvPhone'));
    this.lstColumns.push(new VyTableColumn('נייד', 'nvMobile'));
    this.lstColumns.push(new VyTableColumn('דו"אל', 'nvEmail'));
  }
  avrechId: number;
  flag = false;
  click(e) {
    this.avrechId = e.iPersonId;
    if (e.columnClickName == "open")
      this.editAvrech();
    else
      this.deleteAvrech();

  }
  editAvrech() {
    this.router.navigate(['avrechim/avrech/', this.avrechId])
  }
  deleteAvrech() {
    this.flag = true;
  }

  delete() {
    this.appProxy.post('DeleteAvrech', { iPersonId: this.avrechId })
      .then(result => {
        if (result) {
          let i = 0;
          this.avrechimList.forEach(e => {

            if (e.iPersonId == this.avrechId)
              this.avrechimList.splice(i, 1);
            i++;

          });


        } else { alert(' המחיקה נכשלה'); }
        this.flag = false;
      });
  }

  downloadExcel(t) {
    debugger;
    this.avrechim.downloadExcel(t);
  }
  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }
  tableToPdf(name: string) {
    this.avrechim.downloadPdf(name, 'pdf');
  }
  mailToAvrechim()
  {
this.avrechimList.forEach(avrech => {
  this.mailList[length]=avrech.nvEmail;
});

this.appProxy.post('MailToAvrechim', { mailList: this.mailList })
      .then(result => {

      }
    ,err=>{}
  );
  }
}
