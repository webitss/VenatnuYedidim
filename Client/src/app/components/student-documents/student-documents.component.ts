import { Component, OnInit, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Document } from '../../classes/document';
import { ActivatedRoute, Router } from '@angular/router';
import { VyTableColumn } from '../../templates/vy-table/vy-table.classes';
import { element } from 'protractor';
import { SysTableService } from "../../services/sys-table.service";
import { VyTableComponent } from '../../templates/vy-table/vy-table.component';
import { getDate, getTime } from 'ngx-bootstrap/chronos/utils/date-getters';
import { SysTableRow } from '../../classes/SysTableRow';

@Component({
  selector: 'app-student-documents',
  templateUrl: './student-documents.component.html',
  styleUrls: ['./student-documents.component.css']
})
export class StudentDocumentsComponent implements OnInit {
  belongSheetType: number;
  document: Document;
  id: number;
  public lstDataRows = new Array();
  documents: any;
  upload = false;
  public lstColumns: Array<VyTableColumn> = new Array<VyTableColumn>();


  @ViewChild(VyTableComponent) cc: VyTableComponent;
  categoryTypes: SysTableRow[];

  constructor(private appProxy: AppProxy, private activatedRoute: ActivatedRoute, private router: Router, private sysTableService: SysTableService) { }

  ngOnInit() {

    this.activatedRoute.parent.params.subscribe(params => {
      this.id = params['iPersonId'];
    });
    this.lstColumns.push(new VyTableColumn('עריכה', 'edit', 'html', true));
    this.lstColumns.push(new VyTableColumn('מסמך', 'open', 'html'));
    this.lstColumns.push(new VyTableColumn('תיאור', 'nvComment'));
    this.lstColumns.push(new VyTableColumn('קטגוריה למסמך', 'nvCategory'));
    this.lstColumns.push(new VyTableColumn('תאריך העלאה', 'dtCreatedate'));



    this.sysTableService.getValues(SysTableService.dataTables.belongSheetType.iSysTableId).then(data => {
    this.belongSheetType = data.filter(x => x.nvValue == 'תלמיד')[0].iSysTableRowId;
      this.sysTableService.getValues(SysTableService.dataTables.sheetType.iSysTableId).then(data => { this.categoryTypes = data })
    });

    this.loadDocuments();

  }

  loadDocuments() {
    this.appProxy.post('GetDocumentsByItemId', { iItemId: this.id }).then(data => {
      this.documents = data;
      this.documents.forEach(element => {
        this.lstDataRows.push({
          nvCategory: element.lstObject['nvCategory'],
          dtCreatedate: element.dtCreatedate.toLocaleDateString(),
          nvComment: element.nvComment,
          edit: '<div class="edit"></div>',
          open: '<a href=' + AppProxy.getBaseUrl() + 'Files/' + element.nvDocumentName + ' target="_blank">' + element.nvDocumentName + '</a>',
          iDocumentId: element.iDocumentId

        });
      });
    }
     // , err => alert(err)
    );
  }
  get staticBaseUrl() {
    return AppProxy.getBaseUrl();
  }
  addDocument() {
    this.document = new Document();
    this.document.iItemId = this.id;
    this.document.iBelongingType = this.belongSheetType;
    this.document.iCategoryType = 0;
  }
  editDocument(e) {
    //alert(e.iDocumentId);
    //console.log(e);
    this.documents.forEach(element => {
      if (element.iDocumentId == e.iDocumentId) {
        this.document = new Document();
        this.document.iBelongingType = this.belongSheetType;
        this.document.iCategoryType = element.iCategoryType;
        this.document.iDocumentId = element.iDocumentId;
        this.document.iItemId = element.iItemId;
        this.document.nvComment = element.nvComment;
        this.document.nvDocumentName = element.nvDocumentName;
        if (this.document.iCategoryType == undefined)
          this.document.iCategoryType = 0;
      }
    });

  }
  closeDocumentDialog(save) {
    let category, index;
    if (save == true) {
      for (let i = 0; i < this.lstDataRows.length; i++) {
        if (this.lstDataRows[i].iDocumentId == this.document.iDocumentId) {
          index = i;
          break;
        }
      }
      if (index == undefined) {
        if (this.document.iCategoryType != 0)
          category = this.categoryTypes.filter(x => x.iSysTableRowId == this.document.iCategoryType)[0].nvValue;
        this.lstDataRows.push({
          nvCategory: category,
          dtCreatedate: new Date().toLocaleDateString(),
          nvComment: this.document.nvComment,
          edit: '<div class="edit"></div>',
          open: '<a href=' + AppProxy.getBaseUrl() + 'Files/' + this.document.nvDocumentName + ' target="_blank">' + this.document.nvDocumentName + '</a>',
          iDocumentId: this.document.iDocumentId
        });

        let d = new Document();
        d.iDocumentId = this.document.iDocumentId;
        d.nvComment = this.document.nvComment;
        d.nvDocumentName = this.document.nvDocumentName;
        d.iCategoryType = this.document.iCategoryType;
        d.iItemId = this.document.iItemId;
        d.iBelongingType = this.document.iBelongingType;
        d.nvDocumentType = this.document.nvDocumentType;
        this.documents.push(d);
      }
      else {
        if (this.document.iCategoryType != 0)
          category = this.categoryTypes.filter(x => x.iSysTableRowId == this.document.iCategoryType)[0].nvValue;
        this.lstDataRows[index].nvCategory = category;
        this.lstDataRows[index].nvComment = this.document.nvComment;
        this.lstDataRows[index].open = '<a href=' + AppProxy.getBaseUrl() + 'Files/' + this.document.nvDocumentName + ' target="_blank">' + this.document.nvDocumentName + '</a>';

        for (let i = 0; i < this.documents.length; i++) {
          if (this.documents[i].iDocumentId == this.document.iDocumentId) {
            if (this.document.iCategoryType != 0)
              category = this.categoryTypes.filter(x => x.iSysTableRowId == this.document.iCategoryType)[0].nvValue;
            this.documents[i].iCategoryType = this.document.iCategoryType;
            this.documents[i].nvComment = this.document.nvComment;
            this.documents[i].nvDocumentName = this.document.nvDocumentName;
            this.documents[i].nvDocumentType = this.document.nvDocumentType;
            break;
          }
        }
      }
      this.cc.refreshTable(this.lstDataRows);
      this.document = null;

    }
    else
      this.document = null;
  }
}
