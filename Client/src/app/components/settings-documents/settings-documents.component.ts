import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-settings-documents',
  templateUrl: './settings-documents.component.html',
  styleUrls: ['./settings-documents.component.css']
})
export class SettingsDocumentsComponent implements OnInit {
  public lstDataRows = new Array();
  documents: any;
  baseUrl = 'http://localhost:14777/';
  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
    this.appProxy.get('GetDocuments').then(data=>{this.documents=data;
    this.documents.forEach(element => {
    this.lstDataRows.push({
      nvName:element.lstObject['nvName'],
      nvIdentityCard:element.lstObject['nvIdentityCard'],
      nvCategory:element.lstObject['nvCategory'],
      nvDocumentName:element.nvDocumentName
    })
  });
 }
      ,err=>alert(err));
  
}
public lstColumns = [//{
   // title: 'צפייה',
    //filter: '',
   // name: 'show',
    // filterStyle: {
    //   width: '25%'
    // },
    // cellStyle: {
    //   width: '25%',
    //   background: 'red'
    // }
  //},
  {
    title: 'שם תלמיד',
    //filter: '',
    name: 'nvName',
    // titleStyle: {
    //   width: '25%',
    //   color: 'red'
    // },
    // filterStyle: {
    //   width: '25%'
    // },
    // cellStyle: {
    //   width: '25%',
    //   background: 'red'
    // }
  },
  {
    title: 'מ.ז',
   // filter: '',
    name: 'nvIdentityCard',
    // titleStyle: {
    //   width: '25%',
    //   color: 'red'
    // },
    // filterStyle: {
    //   width: '25%'
    // },
    // cellStyle: {
    //   width: '25%',
    //   background: 'red'
    // }
  },
  {
    title: 'קטגוריה למסמך',
    //filter: '',
    name: 'nvCategory',
    // titleStyle: {
    //   width: '25%',
    //   color: 'red'
    // },
    // filterStyle: {
    //   width: '25%'
    // },
    // cellStyle: {
    //   width: '25%',
    //   background: 'red'
    // }
  },
  {
    title: 'שם מסמך',
    //filter: '',
    name: 'nvDocumentName',
    // titleStyle: {
    //   width: '25%',
    //   color: 'red'
    // },
    // filterStyle: {
    //   width: '25%'
    // },
    // cellStyle: {
    //   width: '25%',
    //   background: 'red'
    // }
  }]

}
