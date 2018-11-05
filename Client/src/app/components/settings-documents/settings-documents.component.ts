import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('AppVyTable') AppVyTable: any;

  constructor(private appProxy: AppProxy) { }

  ngOnInit() {
    this.lstColumns.push(new VyTableColumn('מסמך', 'open', 'html'));
    this.lstColumns.push(new VyTableColumn('שם תלמיד', 'nvName'));
    this.lstColumns.push(new VyTableColumn('מ.ז', 'nvIdentityCard'));
    this.lstColumns.push(new VyTableColumn('קטגוריה למסמך', 'nvCategory'));
    this.lstColumns.push(new VyTableColumn('תאור', 'nvComment'));
    this.lstColumns.push(new VyTableColumn('הורדה', 'download', 'html', true));

    this.appProxy.get('GetDocuments').then(data => {
      this.documents = data;
      this.documents.forEach(element => {
        this.lstDataRows.push({
          nvName: element.lstObject['nvName'],
          nvIdentityCard: element.lstObject['nvIdentityCard'],
          nvCategory: element.lstObject['nvCategory'],
          nvComment: element.nvComment,
          open: '<a href=' + AppProxy.getBaseUrl() + 'Files/' + element.nvDocumentName + ' target="_blank">' + element.nvDocumentName + '</a>',
          download: '<div class="download"></div>',
          iDocumentId: element.iDocumentId

        });
      });
    }
      );

  }
  downloadExcel() {
    this.AppVyTable.downloadExcel();
  }
  tableToPdf(name: string) {
    this.AppVyTable.downloadPdf(name, 'pdf');
  }
  
  download(e) {
    this.documents.forEach(d => {
      if (d.iDocumentId == e.iDocumentId) {
        this.appProxy.post('GetBase64StringForDocument', { documentName: d.nvDocumentName }).then(res => {
          let binaryString = window.atob(res);
          let binaryLen = binaryString.length;
          let bytes = new Uint8Array(binaryLen);
          for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
          }
          let file = d.nvDocumentType ? new Blob([bytes], { type: d.nvDocumentType }) : new Blob([bytes]);
          let link = document.createElement('a');
          link.setAttribute('id', 'linkDownload');
          link.href = window.URL.createObjectURL(file);
          link.download = d.nvDocumentName + (d.nvDocumentType ? '.' + d.nvDocumentType : '');
          link.click();
          try {
            document.getElementById('linkDownload').remove();
          } catch (e) {
            //Global_service.showMessage("הורדת הקובץ נכשלה", "fail");
            console.log(e);
          }
        })
      }
    })

  }
  // get staticBaseUrl() {
  //   return AppProxy.getBaseUrl() ;
  // }


}
