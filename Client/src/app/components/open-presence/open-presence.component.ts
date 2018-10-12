import { Component, OnInit, Input } from '@angular/core';
import { PresenceAvrech } from '../../classes/presenceAvrech';

@Component({
  selector: 'app-open-presence',
  templateUrl: './open-presence.component.html',
  styleUrls: ['./open-presence.component.css']
})
export class OpenPresenceComponent implements OnInit {

  constructor() { }
  @Input()
  protected presence: PresenceAvrech;
  ngOnInit() {
  }

}
