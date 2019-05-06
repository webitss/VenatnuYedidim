import { Component, OnInit, Input } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user';
import { GlobalService } from '../../services/global.service';
import { SysTableService }from '../../services/sys-table.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  protected isGraduate: number = 0;
  component: string;
  protected currentComponent: any;
  protected PicUrl: any;
  protected nvBase64File: string;
  protected name: string;
  protected flag = false;
  protected message = '';
  protected header = '';
  protected tubsName = { student: 1, avrechim: 2, events: 3, graduates: 4, users: 5, settings: 6 };
  protected cuurentTub=this.tubsName.student;
  private idPermission:number;
  public instance: AppComponent;
  public userName: string = this.globalService.getUser() != null ? this.globalService.getUser().nvUserName : "משתמש";
  constructor(private activatedRoute: ActivatedRoute, private appProxy: AppProxy, public router: Router, private route: ActivatedRoute
    , private globalService: GlobalService) { }
    public iPersonId:number;

  ngOnInit() {
    this.instance = this;
    if (this.globalService.getUser() == null)
      this.router.navigate(['']);
      this.iPersonId = this.globalService.getUser()['iPersonId'];
      debugger;
      // this.idPermission = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
  
  }

  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  saveFile() {
    this.appProxy.post('SaveFileByBase64', this.nvBase64File)
      .then(result => {
        if (result) { this.openMessagePopup('השמירה התבצעה בהצלחה'); } else { this.openMessagePopup('שמירת הקובץ נכשלה'); }
      });
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
  private id: number;
  goToUserDetails() {
    this.id = JSON.parse(localStorage.getItem("user")).iPersonId;
    this.router.navigate(['users/user/', this.id]);
  }


  openMessagePopup(message: string) {
    this.message = message;
    this.flag = true;
  }
  
  //     }
  //   }

  // }


}
