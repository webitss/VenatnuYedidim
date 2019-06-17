import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Route } from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';

import { AngularEditorModule } from '@kolkov/angular-editor';
//--- templates ---
import { VyMultySelectComponent } from './templates/vy-multy-select/vy-multy-select.component';
import { VyTableComponent } from './templates/vy-table/vy-table.component';
import { VyTableFilterPipe } from './templates/vy-table/vy-table-filter.pipe';
import { VyTableOrderByPipe, OrderByPipe } from './templates/vy-table/vy-table-order-by.pipe';
import { VyPopUpComponent } from './templates/vy-pop-up/vy-pop-up.component';
//--- Pipes ---
import { FilterPipe } from './pipes/filter.pipe';

//--- services ---
import { AppProxy } from './services/app.proxy';
import { SysTableService } from './services/sys-table.service';
import { GlobalService } from './services/global.service';
import { DialogService } from './services/dialog.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { DataSharingService } from './services/dataSharing.Service';
//--- components ---
import { AppComponent } from './components/app/app.component';

import { StudentsComponent } from './components/students/students.component';
import { StudentComponent } from './components/student/student.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentMeetingsComponent } from './components/student-meetings/student-meetings.component';
import { StudentConversationsComponent } from './components/student-conversations/student-conversations.component';
import { StudentDocumentsComponent } from './components/student-documents/student-documents.component';
import { StudentConversationDetailsComponent } from './components/student-conversation-details/student-conversation-details.component';
import { StudentMeetingDetailsComponent } from './components/student-meeting-details/student-meeting-details.component';
import { StudentEventsComponent } from './components/student-events/student-events.component';
import { StudentEventDetailsComponent } from './components/student-event-details/student-event-details.component';

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


import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

import { SettingsComponent } from './components/settings/settings.component';
import { SettingsCodeTableComponent } from './components/settings-code-tables/settings-code-tables.component';
import { SettingsReportsComponent } from './components/settings-reports/settings-reports.component';
import { SettingsYeshivotComponent } from './components/settings-yeshivot/settings-yeshivot.component';
import { SettingsDocumentsComponent } from './components/settings-documents/settings-documents.component';
import { SettingsFrontendComponent } from './components/settings-frontend/settings-frontend.component';

import { SettingYeshivaComponent } from './components/setting-yeshiva/setting-yeshiva.component';

// import { inject } from '@angular/core/testing';
// import { injectElementRef } from '@angular/core/src/render3';
import { UploadDocumentComponent } from './components/upload-document/upload-document.component';
import { FilterBMultySelectCheckedPipe } from './pipes/filter-b-multy-select-checked.pipe';
import { EventMediaComponent } from './components/event-media/event-media.component';
import { TaskComponent } from './components/task/task.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CardsUnionComponent } from './components/cards-union/cards-union.component';
import { ShowImageComponent } from './components/show-image/show-image.component';
import { MediaComponent } from './components/media/media.component';
import { GaleryComponent } from './components/galery/galery.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { settingsFrontend } from './services/settings-frontend.service';
import { OpenPresenceComponent } from './components/open-presence/open-presence.component';
import { AddParticipantComponent } from './components/add-participant/add-participant.component';
import { EditMailComponent } from './components/edit-mail/edit-mail.component';

import { SafeUrl } from './directives/safe-url';
import { GoogleCity } from './directives/googleCity';
import { FitElement } from './directives/fit-element';
import { GraduatesComponent } from './components/graduates/graduates.component';
import { EditAndDeletePipe } from './pipes/edit-and-delete.pipe';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsTasksToAvrechComponent } from './components/reports-tasks-to-avrech/reports-tasks-to-avrech.component';
import { ReportsBirthdayComponent } from './components/reports-birthday/reports-birthday.component';
import { from } from 'rxjs';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    //templates
    VyMultySelectComponent,
    VyTableComponent,
    VyTableFilterPipe,
    VyTableOrderByPipe,


    // pipes
    FilterPipe,
    OrderByPipe,
    //directives
    GoogleCity,
    SafeUrl,
    FitElement,

    //components
    AppComponent,

    StudentsComponent,
    StudentComponent,
    StudentDetailsComponent,
    StudentMeetingsComponent,
    StudentConversationsComponent,
    StudentConversationDetailsComponent,
    StudentMeetingDetailsComponent,
    StudentDocumentsComponent,
    StudentEventsComponent,
    StudentEventDetailsComponent,
    CardsUnionComponent,

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


    UsersComponent,
    UserComponent,
    UserDetailsComponent,

    SettingsComponent,
    SettingsCodeTableComponent,
    SettingsReportsComponent,
    SettingsYeshivotComponent,
    SettingsDocumentsComponent,
    SettingsFrontendComponent,
    ReportsTasksToAvrechComponent,
    ReportsBirthdayComponent,

    SettingYeshivaComponent,

    GraduatesComponent,

    UploadDocumentComponent,

    FilterBMultySelectCheckedPipe,

    EventMediaComponent,

    TaskComponent,

    LogInComponent,


    ShowImageComponent,


    MediaComponent,


    GaleryComponent,



    CalendarComponent,



    OpenPresenceComponent,



    AddParticipantComponent,
    VyPopUpComponent,
    EditMailComponent,
    EditAndDeletePipe,
    ReportsTasksToAvrechComponent,
    ReportsBirthdayComponent

  ],
  //imports: [ 
  // Ng2SearchPipeModule,


  //],
  imports: [
  
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatIconModule,
    // SelectModule,
    AngularEditorModule,
    NgSelectModule,
    // BrowserAnimationsModule, IgxCalendarModule,
    // CommonModule,
    // NgbModalModule,
    // FlatpickrModule.forRoot(),
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // }),
    // NgbModule.forRoot(),
    // Ng2SearchPipeModule,
    NgxGalleryModule,
    BrowserModule,
     ShowHidePasswordModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NguiDatetimePickerModule,
    NgxImageGalleryModule,
    // NgxEditorModule,
    // ShowHidePasswordModule.forRoot(),
    NgxPasswordToggleModule,
    RouterModule.forRoot([
      // { path: "", component: StudentsComponent },
          { path: "", component: LogInComponent, canDeactivate: [CanDeactivateGuard] },
  
      { path: "ResultComponent", component: ShowImageComponent },
      { path: "show-image", component: ShowImageComponent },

      { path: "students", component: StudentsComponent },
      // { path: "graduates", component: StudentsComponent },

      {

        path: "students/student/:iPersonId", component: StudentComponent,
        children: [
          { path: "", component: StudentDetailsComponent },
          //{ path: "", component: StudentDetailsComponent },
          { path: "student-details", component: StudentDetailsComponent },
          {
            path: "student-meetings", component: StudentMeetingsComponent
          },
          // children: [
          //   { path: "student-meeting-details/:iMeetingId", component: StudentMeetingDetailsComponent }
          // ]

          {
            path: "student-conversations", component: StudentConversationsComponent, children: [
              { path: "student-conversation-details/:ConversationId", component: StudentConversationDetailsComponent },
            ]
          },
          {
            path: "student-documents", component: StudentDocumentsComponent
          },
          {
            path: "student-events", component: StudentEventsComponent
            //  children:[
            //   {path: "student-event-details/:iEventId", component: StudentEventDetailsComponent}
            // ]
          },
          {
            path: "student-events-details/:iEventId", component: StudentEventDetailsComponent
            // ,children: [
            //   { path: "", component: UserDetailsComponent },
            //   { path: "student-event-details", component: StudentEventDetailsComponent }
            //]
          },

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
          { path: "event-participants", component: EventParticipantsComponent },
          { path: "event-media", component: EventMediaComponent },

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
          { path: "settings-reports", component: SettingsReportsComponent,
          // children: [
          //   {path:"ReportsTasksToAvrechComponent", component:ReportsTasksToAvrechComponent},
          //   {path: "ReportsBirthdayComponent",component:  ReportsBirthdayComponent}
          // ]
         },
          {
            path: "settings-yeshivot", component: SettingsYeshivotComponent,
            children: [
              { path: "setting-yeshiva/:EditNewYeshiva", component: SettingYeshivaComponent }
            ]
          },
          { path: "settings-documents", component: SettingsDocumentsComponent },
          { path: "settings-frontend", component: SettingsFrontendComponent },
        ]
      },
      { path: "task", component: TaskComponent },
      { path: "calendar", component: CalendarComponent }

    ], { useHash: true })
  ],
  providers: [AppProxy, SysTableService, GlobalService, CanDeactivateGuard, DialogService, settingsFrontend, DataSharingService],
  bootstrap: [AppComponent],

  // exports: [CalendarComponent]
  // entryComponents:[
  //   CardsUnionComponent
  // ]
})
export class AppModule { }
