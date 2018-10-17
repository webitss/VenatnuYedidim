import { Component, OnInit, Input, Output, ViewContainerRef } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { GlobalService } from '../../services/global.service';
import { DialogService } from '../../services/dialog.service';
import { Observable } from 'rxjs/Observable';
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
    if (JSON.parse(localStorage.getItem("user")) != null)
    this.router.navigate(['students']);
  }

  public imgHeight: number;

  @Input()
  public nvUserName: string;

  @Input()
  public nvPassword: string;


  logIn() {
    this.appProxy.post("Login", { nvUserName: this.nvUserName, nvPassword: this.nvPassword }).then(
      data => {
        if (data != null) {
          // this.user = data;
          data["iUserId"] = data.iPersonId;
          this.appComponent.instance.userName = data.nvUserName;
          localStorage.setItem("user", JSON.stringify(data));
          this.globalService.user = data;

          this.router.navigate(['students']);
        }
        else {
          alert("שם משתמש או סיסמה שגויים!");
        }
      })
  };

  canDeactivate() {
    if (this.globalService.getUser() != null)
      return true;
    return false;


  }
}
