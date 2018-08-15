import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Document } from '../../classes/document';
import { ActivatedRoute, Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';

@Component({
  selector: 'app-student-documents',
  templateUrl: './student-documents.component.html',
  styleUrls: ['./student-documents.component.css']
})
export class StudentDocumentsComponent implements OnInit {
  document: Document;
  id: number;
  public lstDataRows = new Array();
  documents: any;
  upload = false;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();

  constructor(private appProxy: AppProxy, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    });

    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true));
    this.lstColumns.push(new VyTableColumn('קטגוריה למסמך', 'nvCategory'));
    this.lstColumns.push(new VyTableColumn('תאריך העלאה', 'dtCreatedate'));
    this.lstColumns.push(new VyTableColumn('שם מסמך', 'nvDocumentName'));
    this.lstColumns.push(new VyTableColumn('פתיחה', 'open', 'html'));

    this.appProxy.post('GetDocumentsByItemId', {iItemId: this.id}).then(data => {
      this.documents = data;
        this.documents.forEach(element => {
          this.lstDataRows.push({
            nvCategory: element.lstObject['nvCategory'],
            dtCreatedate: element.dtCreatedate.toLocaleDateString(),
            nvDocumentName: element.nvDocumentName,
            edit: '<div class="edit"></div>',
            open: '<a href=' + AppProxy.baseUrl + 'Files/' + element.nvDocumentName + ' target="_blank"> פתח מסמך</a>',
            iDocumentId: element.iDocumentId
          });
        });
      }
        , err => alert(err));

  }

  get staticBaseUrl() {
    return AppProxy.baseUrl;
  }
addDocument() {
  this.document = new Document();
}
  editDocument(e) {
    alert(e.iDocumentId);
    this.document = new Document();
  }
}
