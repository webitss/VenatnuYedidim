import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  constructor(private appProxy:AppProxy) { }

  ngOnInit() {
  }
  protected save = {document:'',name:''}


  loadDocument(event, callback) {
    let name, type, nvBase64File;

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

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
    this.appProxy.post('SaveFileByBase64', {base64File:this.save.document, fileName:this.save.name}).then(data => alert("success")
      , err => alert(err));
  }
}
