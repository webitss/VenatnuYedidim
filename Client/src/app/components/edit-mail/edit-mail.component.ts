import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { AppComponent } from '../app/app.component';

@Component({
  selector: 'app-edit-mail',
  templateUrl: './edit-mail.component.html',
  styleUrls: ['./edit-mail.component.css']
})
export class EditMailComponent implements OnInit {

  constructor(private appProxy: AppProxy, private _parent:AppComponent) { }
  @Input()
  mails: string[] = [];

  @Output()
  subject: string;
  body: string;
  to: string = "";
  ngOnInit() {
    // this.mails.forEach(mail => {
    //   this.to += mail;
    //   this.to += ", ";

    // });
  }
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  save() {
    this.appProxy.post('MailToAvrechim', { mailList: this.mails, subject: this.subject, body: this.body })
      .then(result => {
        if (result)
        this._parent.openMessagePopup("המסר נשלח בהצלחה!");
          this.close.emit();
      }
        , err => { }
      );
  }
  clos() {
    this.close.emit();
  }
  remove(index: number) {
    this.mails.splice(index, 1);
  }



}
