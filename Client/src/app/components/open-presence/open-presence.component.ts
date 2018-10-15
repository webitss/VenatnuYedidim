import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PresenceAvrech } from '../../classes/presenceAvrech';
import { ActivatedRoute } from '@angular/router';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-open-presence',
  templateUrl: './open-presence.component.html',
  styleUrls: ['./open-presence.component.css']
})
export class OpenPresenceComponent implements OnInit {

  constructor(  private appProxy: AppProxy ) { }
  @Input()
  @Output()
  closeMe = new EventEmitter();
  @Output()
  closeMeNoSave = new EventEmitter();
  @Output()
  @Input()
  protected presence: PresenceAvrech;
  ngOnInit() {
  }
  closeDialog() {
    this.closeMe.emit(null);
  }
  closeAndNoSave() {
    this.closeMeNoSave.emit();
  }
  savePresence(){
    // this.presence.dtDatePresence = this.save.name;
    // this.document.nvDocumentType = this.save.type;
debugger;
    this.appProxy.post('SetPresence', { presenceAvrech: this.presence}).then(
      data => {
        if (data == 0)
          alert("error in save data")
        else { this.presence.iPresenceAvrech = 1; this.closeDialog(); }
      }
      , err => alert("err"));

  }
}
