import { Component, OnInit, Input, Output, ViewContainerRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { GlobalService } from '../../services/global.service';
import { DialogService } from '../../services/dialog.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../classes/user';
import { SysTableService } from '../../services/sys-table.service';
// import {GoogleCity} from '../../directives/googleCity';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router, private appComponent: AppComponent, private globalService: GlobalService, private dialogService: DialogService) { }

  ngOnInit() {
    this.imgHeight = window.innerHeight;
    
    // if (JSON.parse(localStorage.getItem("user")) != null)
    // this.router.navigate(['students']);
    // else if ()
    // {
    //   this.router.navigate(['students']);
    // }
  }

  public imgHeight: number;

  @Input()
  public nvUserName: string;

  @Input()
  public nvPassword: string;


  logIn() {

    this.appProxy.post("Login", { nvUserName: this.nvUserName, nvPassword: this.nvPassword }).then(
      
      data => {

//         this.globalService.idPermission = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
// alert(this.globalService.idPermission);
        if (data!=null) {
         
         
          if((data as User).iPermissionId!=7){
            

          // this.user = data;
          data["iUserId"] = data.iPersonId;
          this.appComponent.instance.userName = data.nvUserName;
          localStorage.setItem("user", JSON.stringify(data));
          this.globalService.user = data;

          this.router.navigate(['students']);
          this.globalService.idPermission = this.globalService.getUser().iPermissionId == SysTableService.permissionType.Management ? 0 : this.globalService.getUser().iPersonId;
        }
        if((data as User).iPermissionId==7) 
        {
         
           
          
          this.globalService.UserPermition=7;
        
          this.router.navigate(['/']);
        
        }
      }
        else
        {
          this.globalService.UserPermition=0
          this.router.navigate(['/']);
        }
      
        
      })
  }
;

  canDeactivate() {
    if (this.globalService.getUser() != null)
      return true;
    return false;


  }
}
