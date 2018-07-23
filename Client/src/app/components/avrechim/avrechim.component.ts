import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AvrechComponent } from '../avrech/avrech.component';

import {Avrech} from '../../classes/avrech';

@Component({
  selector: 'app-avrechim',
  templateUrl: './avrechim.component.html',
  styleUrls: ['./avrechim.component.css']
})
export class AvrechimComponent implements OnInit {

 avrech:Avrech
   avrechimList:Avrech[];
   public lstColumns = [{
      title: 'פתיחה',
      name: 'open'
    }
  ,{
    title: 'שם משפחה',
    name: 'nvLastName'
  },
  {
    title: 'שם פרטי',
    name: 'nvFirstName'
  },
  {
    title: 'טלפון',
    name: 'nvPhone'
  },
  {
    title: 'נייד',
    name: 'nvMobile'
  },
  {
    title: 'מייל',
    name: 'nvEmail'
  }];
  public lstDataRows = [{
    
    }];
  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
    this.appProxy.post("GetAllAvrechim",{iPersonId:null}).then(
      data=>
      {
    this.avrechimList=data;
    this.avrechimList.forEach(element => {
      this.lstDataRows.push({
        nvLastName: element.nvLastName,
    nvFirstName: element.nvFirstName,
    nvPhone: element.nvPhone,
    nvMobile: element.nvMobile,
    nvEmail:element.nvEmail
      })
    });
    },
    );
    
  }

}
