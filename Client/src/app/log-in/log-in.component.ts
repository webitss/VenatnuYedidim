import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../classes/user';
import { AppProxy } from '../services/app.proxy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router) { }

  ngOnInit() {
    this.user = null;
  }

  @Input()
  protected nvUserName: string;

  @Input()
  protected nvPassword: string;

  @Input()
  protected user: User

  logIn() {
    this.appProxy.post("Login", { nvUserName: this.nvUserName, nvPassword: this.nvPassword }).then(
      data => {
        debugger;
        this.user = data;
        localStorage.setItem("user",JSON.stringify(this.user));
        this.router.navigate(['students']);
      }
    ).catch(err => {
      alert("שם משתמש או סיסמה שגויים!");
    })
  };

}
