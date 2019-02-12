import { Component, OnInit, Output, Input, EventEmitter, Inject, forwardRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute } from '@angular/router';
import { SysTableService } from '../../services/sys-table.service';
import { SysTableRow } from '../../classes/SysTableRow';
// import { EventEmitter } from 'events';
import { Document } from '../../classes/document';
import { GlobalService } from '../../services/global.service';
import { AppComponent } from '../app/app.component';


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  @Output()
  closeMe = new EventEmitter();

  @Output()
  closeMeNoSave = new EventEmitter();
  @Output()
  @Input()
  public document: Document;

  sheetTypes: SysTableRow[];
  id: any;
  component: string;
  constructor(@Inject(forwardRef(() => AppComponent)) private _parent: AppComponent, private activatedRoute: ActivatedRoute, private appProxy: AppProxy, private sysTableService: SysTableService, private globalService: GlobalService) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      this.component = url.toString();
      if (this.component == "student-documents") {
        this.sysTableService.getValues(SysTableService.dataTables.sheetType.iSysTableId).then(data => {

          this.sheetTypes = data;
          this.document.iCategoryType = this.sheetTypes[0].iSysTableRowId;
        }
          , err => this._parent.openMessagePopup('שגיאה בשליפת הנתונים'));
      }
      this.save.name = this.document.nvDocumentName;
      this.save.type = this.document.nvDocumentType;
    });

  }
  public save = { document: '', name: '', type: '' };


  loadDocument(event, callback) {
    let name, type, nvBase64File;

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];

      if ((window as any).FileReader) {
        if (this.component == "student-documents") {
          if (file.type.indexOf('image') == -1 && file.type.indexOf('pdf') == -1) {
            this._parent.openMessagePopup("לא ניתן להעלות קבצים מסוג זה");
            return;
          }
        }
        else {
          if (file.type.indexOf('image') == -1 && file.type.indexOf('pdf') == -1 && file.type.indexOf('audio') == -1 && file.type.indexOf('video') == -1) {
            this._parent.openMessagePopup("לא ניתן להעלות קבצים מסוג זה");
            return;
          }
        }

        var fileReader = new FileReader();
        name = file.name;
        type = file.type;

        fileReader.onload = function (e) {
          nvBase64File = (e.target as any).result;
          if (callback) { callback.document = nvBase64File; callback.name = name; callback.type = type; }
          // if (callback) callback(nvBase64File,name);
        }
        fileReader.readAsDataURL(file);

      }
    }

  }


  saveFile() {
    // 
    this.document.nvDocumentName = this.save.name;
    this.document.nvDocumentType = this.save.type;

    this.appProxy.post('SetDocument', { document: this.document, nvBase64File: this.save.document, iUserId: this.globalService.getUser()['iUserId'] }).then(
      data => {
        if (data == 0) {
          this._parent.openMessagePopup("error in save data");
          this.closeAndNoSave();
        }
        else { this.document.iDocumentId = data; this.closeDialog(); }
      }
      // , err => alert(err)/
    );
  }


  closeDialog() {
    this.closeMe.emit(null);
  }
  closeAndNoSave() {
    this.closeMeNoSave.emit();
  }
}
