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
    debugger;
    this.router.params.subscribe(params => {
      if (params['iPersonId'] != 0)
        this.appProxy.post("GetUserByPersonId", { iPersonId: 1 })
          .then(data => {
            if (data.iPersonId != 0){
              this.user = data;
              this.appProxy.post("GetPersonById", { iPersonId: 1 })
              .then(data => {
                this.person = data;
              }).catch(err => {
                alert("Error!");
              });
            }
            else{
              this.user = new User();
              this.person = new Person();
            } 
          }).catch(err => {
            alert("Error!");
          });

    });
  }



  @Input()
  @Output()
  user: User;

  @Input()
  @Output()
  person: Person;

  // @Input()
  // @Output()
  // isNew: boolean = false;
}
