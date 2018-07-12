import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentConversationComponent } from './student-conversation.component';

describe('StudentConversationComponent', () => {
  let component: StudentConversationComponent;
  let fixture: ComponentFixture<StudentConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
