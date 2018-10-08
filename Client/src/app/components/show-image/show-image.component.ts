import { Component, OnInit, ViewChild } from '@angular/core';
import { AppProxy } from '../../services/app.proxy';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { settingsFrontend } from '../../services/settings-frontend.service';

// import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {
 
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[]=new Array<NgxGalleryImage>();

  constructor(private appProxy: AppProxy, private settingsFrontend:settingsFrontend) { }
protected titaieName:string="ונתנו ידידים";

protected divModal:boolean;

protected listImage:string[]=["http://localhost:14776/Files/red.jpg","assets/חוף ים.jpg",
"assets/3-big.jpg","assets/IMG_5650.JPG",
"assets/IMG_5650.JPG","assets/IMG_5650.JPG",]
protected documents: any;
protected password:string;


protected lstColumns = [{
 
  title: 'ערך',
  type: 'html',      
 
},
{
  title: 'ערך',
  type: 'html',
},
{
  title: 'ערך',
  type: 'html',
},
]

 
ngOnInit(): void {
  
  this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];


// for(var i=0;i<this.listImage.length;i++)
// {
// this.galleryImages.push( {
//   small: this.listImage[i],
//   medium: this.listImage[i],
//   big: this.listImage[i]
// })
// }

//GetDocumentsOfTadmit צריך להיות GetDocuments הוספתי לך פונקציה אחרת ששולפת רק את המסמכים של התדמית. במקום   
this.appProxy.get('GetDocuments').then(data => {
  debugger;
  this.documents = data;
    this.documents.forEach(element => {
     
     
      if(element.nvDocumentName=="Ayala.jpg" ||element.nvDocumentName=="ההבדל בין עבודה לנופש.jpg"){
       
      this.galleryImages.push({
        small:AppProxy.baseDevUrl+'/Files/'  + element.nvDocumentName,
        medium: AppProxy.baseDevUrl+'/Files/'+element.nvDocumentName,
        big: AppProxy.baseDevUrl+'/Files/'  + element.nvDocumentName,
    });
    }
    });
    alert("this.galleryImages[0].small"+this.galleryImages[this.galleryImages.length].small)
  }
    , err => alert(err));

}
saveLogin(){
  
}
}



