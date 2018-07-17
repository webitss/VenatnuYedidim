import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  private sub: any;
  flag: number;
  protected currentComponent:any;
  constructor(private route: ActivatedRoute) { }
  // subscription:Subscription;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.flag = +params['iPersonId'];
    });
  }
  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}




