import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private appProxy: AppProxy) { }

  ngOnInit() {
  }

  protected currentComponent: any;

  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  saveUser() {
    this.currentComponent.saveUser();
  }
}
