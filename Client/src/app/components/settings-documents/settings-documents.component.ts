import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';

@Component({
  selector: 'app-settings-documents',
  templateUrl: './settings-documents.component.html',
  styleUrls: ['./settings-documents.component.css']
})
export class SettingsDocumentsComponent implements OnInit {
  public lstDataRows = new Array();
  documents: any;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();






  constructor(private appProxy: AppProxy) { }

  ngOnInit() {
    this.lstColumns.push(new VyTableColumn('מסמך', 'open', 'html'));
    this.lstColumns.push(new VyTableColumn('שם תלמיד', 'nvName'));
    this.lstColumns.push(new VyTableColumn('מ.ז', 'nvIdentityCard'));
    this.lstColumns.push(new VyTableColumn('קטגוריה למסמך', 'nvCategory'));
    this.lstColumns.push(new VyTableColumn('תאור', 'nvComment'));

    this.appProxy.get('GetDocuments').then(data => {
    this.documents = data;
      this.documents.forEach(element => {
        this.lstDataRows.push({
          nvName: element.lstObject['nvName'],
          nvIdentityCard: element.lstObject['nvIdentityCard'],
          nvCategory: element.lstObject['nvCategory'],
          nvComment: element.nvComment,
          open: '<a href=' + AppProxy.getBaseUrl()  + 'Files/' + element.nvDocumentName + ' target="_blank">'+element.nvDocumentName+'</a>'
        });
      });
    }
      , err => alert(err));

  }

  // get staticBaseUrl() {
  //   return AppProxy.getBaseUrl() ;
  // }


}
