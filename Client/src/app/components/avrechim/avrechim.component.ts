import { Output, EventEmitter, Component, OnInit, ViewChild, Inject, forwardRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AvrechComponent } from '../avrech/avrech.component';

import { Avrech } from '../../classes/avrech';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router } from '@angular/router';
import { viewClassName } from '../../../../node_modules/@angular/compiler';
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { AppComponent } from '../app/app.component';
import { GlobalService } from '../../services/global.service';
import { debug } from 'util';



@Component({
  selector: 'app-avrechim',
  templateUrl: './avrechim.component.html',
  styleUrls: ['./avrechim.component.css']
})
export class AvrechimComponent implements OnInit {

  avrech: Avrech
  avrechimList: Avrech[];
  mailList: string[] = [];

  header='מחיקת אברך';
  message='האם אתה בטוח שברצונך למחוק אברך זה?';

  @ViewChild('avrechim') avrechim: any;
  @ViewChild(VyTableComponent) vyTableComponent: VyTableComponent;
  protected currentComponent: any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  constructor(private router: Router,public globalService: GlobalService, private appProxy: AppProxy,@Inject(forwardRef(() => AppComponent)) private _parent:AppComponent) { }

  ngOnInit() {
    this.iPersonId = this.globalService.getUser()['iPersonId'];
    this.appProxy.post("GetAllAvrechim", { iPersonId: this.iPersonId }).then(
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
    this.lstColumns.push(new VyTableColumn('בחר', 'checked', 'checkbox'));
  }

  private iPersonId:number;

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
      this._parent.openMessagePopup("המחיקה התבצעה בהצלחה!");
          const i=this.avrechimList.findIndex(x=>x.iPersonId==this.avrechId);
        this.avrechimList.splice(i, 1);
        this.vyTableComponent.refreshTable(this.avrechimList);



        } else { this._parent.openMessagePopup('המחיקה נכשלה'); }
        this.flag = false;
      });
  }

  downloadExcel(t = null) {
      
    this.avrechim.downloadExcel(t);
  }
  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }
  tableToPdf(name: string) {
    this.avrechim.downloadPdf(name, 'pdf');
  }
  mail: boolean = false;
  
  mailToAvrechim() {
    this.mail = true;
    this.mailList = [];
    this.avrechimList.filter(a => a['checked'] == true).forEach(avrech => {
      this.mailList.push(avrech.nvEmail);
    });
    this.mail=true;
    // if(this.mailList.length == 0){
    //   this._parent.openMessagePopup("לא נבחרו אברכים");
    //   this.mail=false;
    // }
    // else
    // {

    // }
      // this.appProxy.post('MailToAvrechim', { mailList: this.mailList })
      // .then(result => {
      // }
      //   , err => { }
      // );
    // let s = ''
    // let n = 777;
    // let arr = [{ 400: 'ת' },{ 1: 'א' }]
    // let n1=n;
    // for (let i = 0; i < 22; i++) {
    //   while (n1 - arr[i][] > 0) {
    //     s += arr[i];
    //     n1-=arr[i];
    //   }
    // }
  }
  closeMe(){
    this.mail=false;
  }
}
