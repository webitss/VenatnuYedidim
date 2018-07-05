import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvrechimComponent } from './avrechim.component';

describe('AvrechimComponent', () => {
  let component: AvrechimComponent;
  let fixture: ComponentFixture<AvrechimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvrechimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvrechimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
