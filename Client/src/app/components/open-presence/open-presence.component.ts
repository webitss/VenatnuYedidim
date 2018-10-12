import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PresenceAvrech } from '../../classes/presenceAvrech';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-open-presence',
  templateUrl: './open-presence.component.html',
  styleUrls: ['./open-presence.component.css']
})
export class OpenPresenceComponent implements OnInit {

  constructor(  ) { }
  @Input()
  @Output()
  closeMe = new EventEmitter();
  @Output()
  closeMeNoSave = new EventEmitter();
  @Input()
  @Output()
  protected presence: PresenceAvrech;
  ngOnInit() {
  }
  closeDialog() {
    this.closeMe.emit(null);
  }
  closeAndNoSave() {
    this.closeMeNoSave.emit();
  }
}
