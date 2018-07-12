import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-avrech-details',
  templateUrl: './avrech-details.component.html',
  styleUrls: ['./avrech-details.component.css']
})
export class AvrechDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.activatedRoute.parent.params.subscribe(params => {
    //   params['iPersonId'];
    // })    
  }

}
