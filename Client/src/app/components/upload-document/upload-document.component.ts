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
  // comment = '';
  // category: number;
  constructor(private activatedRoute: ActivatedRoute , private appProxy:AppProxy,private sysTableService:SysTableService) { }

  ngOnInit() {
    this.sysTableService.getValues(SysTableService.dataTables.sheetType.iSysTableId).then(data=>this.sheetTypes=data
      , err => alert('error'));
      this.save.name=this.document.nvDocumentName;
  }
  protected save = {document: '', name: ''};


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
          if (callback){ callback.document= nvBase64File;callback.name=name;}
          // if (callback) callback(nvBase64File,name);
        }
        fileReader.readAsDataURL(file);

      }
    }

  }


  saveFile(){
    //alert(this.save.name);
  //   this.appProxy.post('SaveFileByBase64', {base64File:this.save.document, fileName:this.save.name}).then(data => alert("success")
  //     , err => alert(err));
  // }
  // if(this.save.document!=''){
  // this.appProxy.post('AddFile', {iItemId:this.id,iBelongingType:4,iCategoryType:this.category,nvBase64File:this.save.document, nvFileName:this.save.name,nvComment:this.comment}).then(data => alert("success")
  //     , err => alert(err));
  // }

  if(this.save.name!=undefined){
    this.appProxy.post('SetDocument', {document:this.document, iBelongingType:4,nvBase64File:this.save.document, nvFileName:this.save.name}).then(data => alert("success")
        , err => alert(err));
    }
}
closeDialog(){  
  this.closeMe.emit(null);
}
}
