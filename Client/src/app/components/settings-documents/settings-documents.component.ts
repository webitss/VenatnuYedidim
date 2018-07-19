import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-settings-documents',
  templateUrl: './settings-documents.component.html',
  styleUrls: ['./settings-documents.component.css']
})
export class SettingsDocumentsComponent implements OnInit {

  documents: any;
  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
    this.appProxy.get('GetDocuments').then(data=>this.documents=data
      ,err=>alert(err));
  }

}
