import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';
import { Student } from '../../classes/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {
  private sub: any;
  flag: number;
  protected currentComponent:any;
  


  constructor(private route: ActivatedRoute,private appProxy:AppProxy) { }
  // subscription:Subscription;
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
    this.flag = +params['iPersonId'];

    });
   
  }
  onRouterOutletActivate(event) {
   
    this.currentComponent = event;
  }

  save() {

    if (this.currentComponent.saveStudent) this.currentComponent.saveStudent();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}







