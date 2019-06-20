import { Component, OnInit, Input, Output } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user';
import { ParentChildService } from '../../services/parent-child.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  @Input()
  @Output()
  public user: User;
  public title: string;
  f:boolean=false;

  constructor(private appProxy: AppProxy, private router: Router, private route: ActivatedRoute,private _sharedService:ParentChildService) { }

  ngOnInit() {
    this._sharedService.changeEmitted$.subscribe(
      text => {
        debugger;
          this.f=true;
      });
    this.route.params.subscribe(params => {
      if (params['iPersonId'] != '0') {
        this.appProxy.post("GetUser", { iPersonId: params['iPersonId'] })
          .then(data => {
            this.user = data;
            this.title = this.user.nvUserName;
          }).catch(err=>{
              //alert(err);
          });
      }
      else {
        this.user = new User();
        this.title = 'משתמש חדש';
      }
    });
  }

  public currentComponent: any;

  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  formValid=false;

  isDisabled():boolean {
    return this.currentComponent.form.valid;
  }

  saveUser() {
    this.currentComponent.saveUser();
  }
}
