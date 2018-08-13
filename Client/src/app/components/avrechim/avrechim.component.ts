import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AvrechComponent } from '../avrech/avrech.component';

import {Avrech} from '../../classes/avrech';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { Router } from '@angular/router';

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
  constructor(private router: Router,private appProxy:AppProxy) { }

  ngOnInit() {

   
    this.appProxy.post("GetAllAvrechim",{iPersonId:null}).then(
      data=>
      {
    this.avrechimList=data;
    this.avrechimList.forEach(
      
      a => {
        debugger;
         a['open'] = '<div class="edit"></div>'; 
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
}
