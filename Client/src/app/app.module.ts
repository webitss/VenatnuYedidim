import { NgModule, Component } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Route } from '@angular/router';

//--- services ---
import { AppProxy } from './services/app.proxy';
//--- components ---
import { AppComponent } from './components/app/app.component';
import { SettingComponent } from './components/setting/setting.component';


@NgModule({
  declarations: [
    //components
    AppComponent,
    SettingComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,   
    RouterModule.forRoot([
      {
        path: "setting", component: SettingComponent
      },
    ], { useHash: true }) 
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
