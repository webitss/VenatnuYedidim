import { Component, OnInit } from '@angular/core';
//import { WavesModule, LightBoxModule } from 'ng-uikit-pro-standard'
@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  constructor() { }
  
    images = [
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 1" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 2" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 3" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 4" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 5" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 6" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 7" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 8" },
        { img: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", thumb: "http://localhost:14776/Files/Background_ForwardDirection_DeskScale.jpg", description: "Image 9" }
    ]

  ngOnInit() {
  }

}
