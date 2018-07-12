import { Component, OnInit } from '@angular/core';
import { NewYeshivaComponent } from '../new-yeshiva/new-yeshiva.component';
import { Yeshiva } from '../../classes/Yeshiva';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings-yeshivot',
  templateUrl: './settings-yeshivot.component.html',
  styleUrls: ['./settings-yeshivot.component.css']
})
export class SettingsYeshivotComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
  
}
