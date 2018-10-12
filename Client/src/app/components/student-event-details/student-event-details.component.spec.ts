import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventDetailsComponent } from './student-event-details.component';

describe('StudentEventDetailsComponent', () => {
  let component: StudentEventDetailsComponent;
  let fixture: ComponentFixture<StudentEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
