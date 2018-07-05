import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Route } from '@angular/router';

//--- services ---
import { AppProxy } from './services/app.proxy';
//--- components ---
import { AppComponent } from './components/app/app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EventsComponent } from './components/events/events.component';
import { ReportsComponent } from './components/reports/reports.component';
import { InstitutesComponent } from './components/institutes/institutes.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ImagesComponent } from './components/images/images.component';

@NgModule({
  declarations: [
    //components
    AppComponent,
    SettingsComponent,
    UsersComponent,
    UserDetailsComponent,
    EventsComponent,
    ReportsComponent,
    InstitutesComponent,
    DocumentsComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      // { path: "students", component: StudentsComponent },
      // { path: "avrechim", component: AvrechimComponent },
      { path: "events", component: EventsComponent },
      { path: "users", component: UsersComponent },
      { path: "users/user-details", component: UserDetailsComponent },
      { path: "settings", component: SettingsComponent ,
      children:[
        { path: "reports", component: ReportsComponent },
        {path:"institutes",component: InstitutesComponent},
        {path:"documents",component:DocumentsComponent},
        {path:"images",component:ImagesComponent}
      ]},
    ], { useHash: true })
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
