import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeshivotComponent } from './yeshivot.component';

describe('YeshivotComponent', () => {
  let component: YeshivotComponent;
  let fixture: ComponentFixture<YeshivotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeshivotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeshivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
