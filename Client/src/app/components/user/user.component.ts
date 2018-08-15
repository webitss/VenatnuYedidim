import { Component, OnInit, Input, Output } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../classes/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  @Input()
  @Output()
  public user: User;
  protected title: string;

  constructor(private appProxy: AppProxy, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['iPersonId'] != '0') {
        this.appProxy.post("GetUser", { iPersonId: params['iPersonId'] })
          .then(data => {
            this.user = data;
            this.title = this.user.nvUserName;
          });
      }
      else {
        this.user = new User();
        this.title = 'משתמש חדש';
      }
    });
  }

  protected currentComponent: any;

  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  saveUser() {
    this.currentComponent.saveUser();
  }
}
