import { Component, OnInit, Input, Output, ViewChild, Inject, forwardRef } from '@angular/core';
import { User } from '../../classes/user';
import { Person } from '../../classes/person';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { SysTableService } from '../../services/sys-table.service';
import { GlobalService } from '../../services/global.service';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy, private globalService: GlobalService, private router: Router, private route: ActivatedRoute
    , private sysTableService: SysTableService, @Inject(forwardRef(() => AppComponent)) private _parent: AppComponent) { }

  ngOnInit() {
    this.user = new User();
    this.route.parent.params.subscribe(params => {
      if (params['iPersonId'] != '0') {
        this.appProxy.post("GetUser", { iPersonId: params['iPersonId'] })
          .then(data => {
            this.user = data;
          }).catch(err => {
            this._parent.openMessagePopup("שגיאה בשליפת הנתונים!");
          });
      }
    });
    this.sysTableService.getValues(4).then(data => {

      this.lst = data;
      if (this.user.iPersonId == 0) {
        this.user.iPermissionId = this.lst[0].iSysTableRowId;
      }
    });
    if (this.globalService.getUser().iPermissionId == 5)
      this.isManeger = true;
    else this.isManeger = false;
  }
  @Input()
  @Output()
  public user: User;

  @Input()
  @Output()
  public person: Person;

  @Output()
  isManeger: boolean = false;
  notFocused1: boolean = true;
  notFocused2: boolean = true;
  notFocused3: boolean = true;


  @ViewChild(NgForm) form;

  public lst: Array<any>;

  saveUser() {
    this.appProxy.post("SetUser", { user: this.user, iUserId: this.globalService.getUser().iPersonId }).then(data => {
      if (data == true) {
        this._parent.openMessagePopup("השמירה התבצעה בהצלחה!");
        this.router.navigate(['users']);
      }
      else
        this._parent.openMessagePopup("השמירה נכשלה!");
    }).catch(err => {

    });
  }

}
