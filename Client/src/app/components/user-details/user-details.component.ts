import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../../classes/user';
import { Person } from '../../classes/person';
import { AppProxy } from '../../services/app.proxy';
import { ActivatedRoute, Router } from '@angular/router';
import { SysTableService } from '../../services/sys-table.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private appProxy: AppProxy, private router: Router, private route: ActivatedRoute, private sysTableService: SysTableService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['iPersonId'] != '0') {
        this.appProxy.post("GetUser", { iPersonId: params['iPersonId'] })
          .then(data => {
            this.user = data;
            debugger;
          });
      }
      else {
        this.user = new User();
      }
    });
    this.sysTableService.getValues(4).then(data => {
      debugger
      this.lst = data;
    });
  }
  @Input()
  @Output()
  public user: User;

  @Input()
  @Output()
  public person: Person;

  public lst: Array<any>;

  saveUser() {
    this.appProxy.post("SetUser", { user: this.user, iUserId: 1 }).then(data => {
      debugger
      if (data == true) {
        alert("המשתמש נוסף בהצלחה!");
        this.router.navigate(['users']);
      }

      else
        alert("error!");
    })
  }

}
