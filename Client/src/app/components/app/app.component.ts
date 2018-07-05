import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private appProxy: AppProxy) { }
  PicUrl: string;
  ngOnInit() {
    // this.appProxy.post('Login', { nvUserName: 'מערכת', nvPassword: '1234' })
    //   .then(user => {
    //     if (user) alert('שם משתמש: ' + user.nvUserName + ', סיסמה:' + user.nvPassword);
    //     else alert('משתמש לא קיים');
    //   });
  }
  //   loudImage(event){    
  // let name ,type, nvBase64File;

  //     let fileList: FileList = event.target.files;
  //     if (fileList.length > 0) {
  //       let file: File = fileList[0];

  //       var fileType = file.name.substring(file.name.indexOf(".") + 1, file.name.length);

  //       if ((window as any).FileReader) {
  //         var fileReader = new FileReader();
  //         name = file.name;
  //         type = file.type;
  //         fileReader.onload = function (e) {
  //           // media.nvBase64File = (e.target as any).result;          
  //           nvBase64File = (e.target as any).result.substring(
  //             (e.target as any).result.indexOf(";"),
  //             (e.target as any).result.length
  //           );

  //         }
  //         fileReader.readAsDataURL(file);

  //       }
  //     }

  // }
}