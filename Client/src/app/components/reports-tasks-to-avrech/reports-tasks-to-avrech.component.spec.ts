import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTasksToAvrechComponent } from './reports-tasks-to-avrech.component';

describe('ReportsTasksToAvrechComponent', () => {
  let component: ReportsTasksToAvrechComponent;
  let fixture: ComponentFixture<ReportsTasksToAvrechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTasksToAvrechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTasksToAvrechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
