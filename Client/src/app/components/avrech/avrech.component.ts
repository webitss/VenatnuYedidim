import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AvrechDetailsComponent} from '../avrech-details/avrech-details.component'


@Component({
  selector: 'app-avrech',
  templateUrl: './avrech.component.html',
  styleUrls: ['./avrech.component.css']
})
export class AvrechComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  save()
  {
  }
}
