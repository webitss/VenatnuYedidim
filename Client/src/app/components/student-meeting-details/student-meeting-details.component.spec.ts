import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMeetingDetailsComponent } from './student-meeting-details.component';

describe('StudentMeetingDetailsComponent', () => {
  let component: StudentMeetingDetailsComponent;
  let fixture: ComponentFixture<StudentMeetingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMeetingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
