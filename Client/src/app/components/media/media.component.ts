import { Component, OnInit, Output, Input } from '@angular/core';
import { Document } from '../../classes/document';

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

}
