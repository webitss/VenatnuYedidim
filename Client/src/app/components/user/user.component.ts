import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router) { }

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
