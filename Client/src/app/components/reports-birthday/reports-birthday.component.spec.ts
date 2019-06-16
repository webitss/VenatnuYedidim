import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBirthdayComponent } from './reports-birthday.component';

describe('ReportsBirthdayComponent', () => {
  let component: ReportsBirthdayComponent;
  let fixture: ComponentFixture<ReportsBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
