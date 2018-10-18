import { Component, OnInit, Output, Input } from '@angular/core';
import { Document } from '../../classes/document';
import { AppProxy } from '../../services/app.proxy';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  @Output()
  @Input()
  protected document: Document;

  constructor() { }

  ngOnInit() {
  }

  get baseFileUrl(){
    return AppProxy.getBaseUrl() +'Files/';
  }
}
