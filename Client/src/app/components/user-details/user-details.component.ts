import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../../classes/user';
import { Person } from '../../classes/person';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params['iPersonId'] != '0') {
        this.appProxy.post("GetUser", { iPersonId: params['iPersonId'] })
          .then(data => {
            this.user = data;
          });
      }
      else {
        this.user = new User();
      }
    });
  }
  @Input()
  @Output()
  public user: User;

  @Input()
  @Output()
  public person: Person;

  saveUser() {
    this.appProxy.post("SetUser", { user: this.user, iUserId: 1 }).then(data => {
      if (data == true)
        alert("המשתמש נוסף בהצלחה!");
      else
        alert("error!");
    })
  }

}
