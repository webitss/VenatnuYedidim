import { Component, OnInit, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  protected currentComponent: any;
  protected PicUrl: any;
  protected nvBase64File: string;
  protected name: string;
  constructor(private appProxy: AppProxy, private router: Router) { }

  ngOnInit() {
    this.router.navigate(['students']);

    // this.appProxy.post('Login', { nvUserName: 'מערכת', nvPassword: '1234' })
    //   .then(user => {
    //     if (user) alert('שם משתמש: ' + user.nvUserName + ', סיסמה:' + user.nvPassword);
    //     else alert('משתמש לא קיים');
    //   });
  }

  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  saveFile() {
    this.appProxy.post('SaveFileByBase64', this.nvBase64File)
      .then(result => {
        if (result) alert('שמירת הקובץ התבצעה בהצלחה')
        else alert('שמירת הקובץ נכשלה')
      })
  }


  LoadImage(event, callback) {
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
          if (callback) callback();
        }
        fileReader.readAsDataURL(file);

      }
    }

  }
  //     }
  //   }

  // }

 
 
}