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
import { AvrechimComponent } from './components/avrechim/avrechim.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EventsComponent } from './components/events/events.component';
import { ReportsComponent } from './components/reports/reports.component';
import { InstitutesComponent } from './components/institutes/institutes.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ImagesComponent } from './components/images/images.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventParticipantsComponent } from './components/event-participants/event-participants.component';
import { EventComponent } from './components/event/event.component';
import { AvrechimDetailsComponent } from './components/avrechim-details/avrechim-details.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentComponent } from './components/student/student.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { CallsComponent } from './components/calls/calls.component';


@NgModule({
  declarations: [
    //components
    AppComponent,
    AvrechimComponent,
    SettingsComponent,
    UsersComponent,
    UserDetailsComponent,
    EventsComponent,
    ReportsComponent,
    InstitutesComponent,
    DocumentsComponent,
    ImagesComponent,
    EventDetailsComponent,
    EventParticipantsComponent,
    EventComponent,
    AvrechimDetailsComponent,
    StudentsComponent,
    StudentDetailsComponent,
    StudentComponent,
    MeetingsComponent,
    CallsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "avrechim", component: AvrechimComponent },
      { path: "avrechim/avrechimDetails/:id", component: AvrechimDetailsComponent },
      // { path: "avrechimDetails/:id", component: AvrechimDetailsComponent },    
      { path: "events", component: EventsComponent },
      {
        path: "events/event", component: EventComponent,
        children: ([{ path: "event-participants", component: EventParticipantsComponent }
          , { path: "event-details", component: EventDetailsComponent }])
      },
      { path: "users", component: UsersComponent },
      { path: "users/user-details", component: UserDetailsComponent },
      { path: "settings", component: SettingsComponent ,
      children:[
        { path: "reports", component: ReportsComponent },
        {path:"institutes",component: InstitutesComponent},
        {path:"documents",component:DocumentsComponent},
        {path:"images",component:ImagesComponent}
      ]},
      {path: "students", component: StudentsComponent },
      {path:"students/student/:id",component:StudentComponent,children:[{ path: "student-details", component: StudentDetailsComponent }] }
    ], { useHash: true })
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
