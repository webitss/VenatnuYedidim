import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AvrechDetailsComponent} from '../avrech-details/avrech-details.component'
import { AppProxy } from '../../services/app.proxy';
import{BehaviorSubject} from'rxjs/BehaviorSubject'


@Component({
  selector: 'app-avrech',
  templateUrl: './avrech.component.html',
  styleUrls: ['./avrech.component.css']
})
export class AvrechComponent implements OnInit {

  protected currentComponent: any;




  constructor(private router: Router, private route: ActivatedRoute, private appProxy:AppProxy) {
  }

  ngOnInit() {
  }

  onRouterOutletActivate(event) {
    this.currentComponent = event;
  }

  save() {

    if (this.currentComponent.save) this.currentComponent.save();
  }

  close()
  {
    this.router.navigate(["avrechim"]);
  }
  
} 
    
