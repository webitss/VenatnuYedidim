import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentConversationDetailsComponent } from './student-conversation-details.component';

describe('StudentConversationDetailsComponent', () => {
  let component: StudentConversationDetailsComponent;
  let fixture: ComponentFixture<StudentConversationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentConversationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentConversationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
