import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-avrech-details',
  templateUrl: './avrech-details.component.html',
  styleUrls: ['./avrech-details.component.css']
})
export class AvrechDetailsComponent implements OnInit {

  id:number;
  constructor(private activatedRoute: ActivatedRoute ,private appProxy:AppProxy) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(params => {
      this.id=params['iPersonId'];
    })   

  }

}
