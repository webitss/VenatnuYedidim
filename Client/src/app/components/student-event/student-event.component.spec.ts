import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEventComponent } from './student-event.component';

describe('StudentEventComponent', () => {
  let component: StudentEventComponent;
  let fixture: ComponentFixture<StudentEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
