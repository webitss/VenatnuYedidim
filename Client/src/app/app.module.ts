import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Route } from '@angular/router';

//--- templates ---
import { VyTableComponent } from './templates/vy-table/vy-table.component';

//--- services ---
import { AppProxy } from './services/app.proxy';
//--- components ---
import { AppComponent } from './components/app/app.component';

import { StudentsComponent } from './components/students/students.component';
import { StudentComponent } from './components/student/student.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentMeetingsComponent } from './components/student-meetings/student-meetings.component';
import { StudentConversationsComponent } from './components/student-conversations/student-conversations.component';

import { AvrechimComponent } from './components/avrechim/avrechim.component';
import { AvrechComponent } from './components/avrech/avrech.component';
import { AvrechDetailsComponent } from './components/avrech-details/avrech-details.component';
import { AvrechStudentsComponent } from './components/avrech-students/avrech-students.component';
import { AvrechDiaryComponent } from './components/avrech-diary/avrech-diary.component';
import { AvrechPresenceComponent } from './components/avrech-presence/avrech-presence.component';

import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventParticipantsComponent } from './components/event-participants/event-participants.component';

import { GraduatesComponent } from './components/graduates/graduates.component';

import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

import { SettingsComponent } from './components/settings/settings.component';
import { SettingsCodeTableComponent } from './components/settings-code-tables/settings-code-tables.component';
import { SettingsReportsComponent } from './components/settings-reports/settings-reports.component';
import { SettingsYeshivotComponent } from './components/settings-yeshivot/settings-yeshivot.component';
import { SettingsDocumentsComponent } from './components/settings-documents/settings-documents.component';
import { SettingsFrontendComponent } from './components/settings-frontend/settings-frontend.component';
import { VyMultySelectComponent } from './templates/vy-multy-select/vy-multy-select.component';
import { StudentConversationComponent } from './components/student-conversation/student-conversation.component';
import { StudentConversationDetailsComponent } from './components/student-conversation-details/student-conversation-details.component';

@NgModule({
  declarations: [
    //templates
    VyTableComponent,

    //components
    AppComponent,

    StudentsComponent,
    StudentComponent,
    StudentDetailsComponent,
    StudentMeetingsComponent,
    StudentConversationsComponent,

    AvrechimComponent,
    AvrechComponent,
    AvrechDetailsComponent,
    AvrechStudentsComponent,
    AvrechDiaryComponent,
    AvrechPresenceComponent,

    EventsComponent,
    EventComponent,
    EventDetailsComponent,
    EventParticipantsComponent,

    GraduatesComponent,

    UsersComponent,
    UserComponent,
    UserDetailsComponent,

    SettingsComponent,
    SettingsCodeTableComponent,
    SettingsReportsComponent,
    SettingsYeshivotComponent,
    SettingsDocumentsComponent,
    SettingsFrontendComponent,
    VyMultySelectComponent,
    StudentConversationComponent,
    StudentConversationDetailsComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "students", component: StudentsComponent },
      {
        path: "students/student/:iPersonId", component: StudentComponent,
        children: [
          { path: "", component: StudentDetailsComponent },
          { path: "student-details", component: StudentDetailsComponent },
          { path: "student-meetings", component: StudentMeetingsComponent },
          { path: "student-conversations", component: StudentConversationsComponent },
        ]
      },
      { path: "avrechim", component: AvrechimComponent },
      {
        path: "avrechim/avrech/:iPersonId", component: AvrechComponent,
        children: [
          { path: "", component: AvrechDetailsComponent },
          { path: "avrech-details", component: AvrechDetailsComponent },
          { path: "avrech-students", component: AvrechStudentsComponent },
          { path: "avrech-diary", component: AvrechDiaryComponent },
          { path: "avrech-presence", component: AvrechPresenceComponent }
        ]
      },
      { path: "events", component: EventsComponent },
      {
        path: "events/event/:iEventId", component: EventComponent,
        children: [
          { path: "", component: EventDetailsComponent },
          { path: "event-details", component: EventDetailsComponent },
          { path: "event-participants", component: EventParticipantsComponent }
        ]
      },
      { path: "graduates", component: GraduatesComponent },

      { path: "users", component: UsersComponent },
      {
        path: "users/user/:iPersonId", component: UserComponent,
        children: [
          { path: "", component: UserDetailsComponent },
          { path: "user-details", component: UserDetailsComponent }
        ]
      },
      {
        path: "settings", component: SettingsComponent,
        children: [
          { path: "", component: SettingsCodeTableComponent },
          { path: "settings-code-tables", component: SettingsCodeTableComponent },
          { path: "settings-reports", component: SettingsReportsComponent },
          { path: "settings-yeshivot", component: SettingsYeshivotComponent },
          { path: "settings-documents", component: SettingsDocumentsComponent },
          { path: "settings-frontend", component: SettingsFrontendComponent },
        ]
      },
    ], { useHash: true })
  ],
  providers: [AppProxy],
  bootstrap: [AppComponent]
})
export class AppModule { }
