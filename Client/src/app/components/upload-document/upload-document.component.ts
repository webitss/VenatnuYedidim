import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute } from '@angular/router';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
// import { EventEmitter } from 'events';
import { Document } from '../../classes/document';


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  @Output()
  closeMe = new EventEmitter();

  @Output()
  @Input()
  protected document: Document;

  sheetTypes: SysTableRow[];
  id: any;
  component: string;
  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy, private sysTableService: SysTableService) { }

  ngOnInit() {
    // this.sysTableService.getValues(SysTableService.dataTables.sheetType.iSysTableId).then(data => this.sheetTypes = data
    //   , err => alert('error'));
    // this.save.name = this.document.nvDocumentName;

    this.activatedRoute.url.subscribe(url => {
    this.component = url.toString();
      if (this.component == "student-documents") {
        this.sysTableService.getValues(SysTableService.dataTables.sheetType.iSysTableId).then(data => this.sheetTypes = data
          , err => alert('error'));
        this.save.name = this.document.nvDocumentName;
      }
    });

  }
  protected save = { document: '', name: '' };


  loadDocument(event, callback) {
    let name, type, nvBase64File;

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];

      if ((window as any).FileReader) {
        var fileReader = new FileReader();

        name = file.name;
        type = file.type;

        fileReader.onload = function (e) {
          nvBase64File = (e.target as any).result;
          if (callback) { callback.document = nvBase64File; callback.name = name; }
          // if (callback) callback(nvBase64File,name);
        }
        fileReader.readAsDataURL(file);

      }
    }

  }


  saveFile() {
    this.document.nvDocumentName = this.save.name;

    this.appProxy.post('SetDocument', { document: this.document, nvBase64File: this.save.document }).then(data => this.closeDialog()
      , err => alert(err));
  }


  closeDialog() {
    this.closeMe.emit(null);
  }
}
