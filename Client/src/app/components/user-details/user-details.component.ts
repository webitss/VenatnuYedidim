import { Component, OnInit, Input, Output } from '@angular/core';
import { user } from '../../classes/user';
import { Person } from '../../classes/person';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy) { }

  ngOnInit() {
    this.appProxy.post("GetUserByPersonId", { iPersonId: 1 })
      .then(data => {
        this.user = data;
      }).catch(err => {
        alert("Error!");
      });
    this.appProxy.post("GetUserByPersonId", { iPersonId: 1 })
      .then(data => {
        this.person = data;
      }).catch(err => {
        alert("Error!");
      });
  }

  @Input()
  @Output()
  user: user;

  @Input()
  @Output()
  person: Person;
}
