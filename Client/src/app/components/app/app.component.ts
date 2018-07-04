import { Component, OnInit } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private appProxy: AppProxy) { }

  ngOnInit() {
    this.appProxy.post('Login', { nvUserName: 'מערכת', nvPassword: '1234' })
      .then(user => {
        if (user) alert('שם משתמש: ' + user.nvUserName + ', סיסמה:' + user.nvPassword);
        else alert('משתמש לא קיים');
      });
  }

}