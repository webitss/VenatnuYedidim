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
  public currentComponent: any;
  student: Student;
  id: number;

  constructor(private route: ActivatedRoute, private appProxy: AppProxy) { }
  // subscription:Subscription;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.flag = +params['iPersonId'];
    });
  
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['iPersonId'];
    
      if (this.id != 0) {
        this.appProxy.post("GetStudentById", { iPersonId: this.id }).then(data => { this.student = data; })
      }
    });
  };

  // ngOnInit() {
  //   this.sub = this.route.params.subscribe(params => {
  //      this.id = +params['id']; // (+) converts string 'id' to a number

  //      // In a real app: dispatch action to load the details here.
  //   });
  // }


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







