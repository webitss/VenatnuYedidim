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

  @ViewChild(AvrechDetailsComponent)
  private AvrechDetailsComp:AvrechDetailsComponent;

  

  constructor(private router: Router, private route: ActivatedRoute, private appProxy:AppProxy) {
  }

  ngOnInit() {
    this.AvrechDetailsComp=new AvrechDetailsComponent(new ActivatedRoute(),this.appProxy);
  }

  save()
  {
    if (this.route.snapshot.children[0].component == AvrechDetailsComponent) {
      this.AvrechDetailsComp.save();
    }
  }

  close()
  {
    this.router.navigate(["avrechim"]);
  }
}
