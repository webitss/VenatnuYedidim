import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvrechimDetailsComponent } from './avrechim-details.component';

describe('AvrechimDetailsComponent', () => {
  let component: AvrechimDetailsComponent;
  let fixture: ComponentFixture<AvrechimDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvrechimDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvrechimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
