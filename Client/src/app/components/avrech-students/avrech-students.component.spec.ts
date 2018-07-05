import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvrechStudentsComponent } from './avrech-students.component';

describe('AvrechStudentsComponent', () => {
  let component: AvrechStudentsComponent;
  let fixture: ComponentFixture<AvrechStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvrechStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvrechStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
