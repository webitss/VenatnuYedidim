import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VyPopUpComponent } from './vy-pop-up.component';

describe('VyPopUpComponent', () => {
  let component: VyPopUpComponent;
  let fixture: ComponentFixture<VyPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VyPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
