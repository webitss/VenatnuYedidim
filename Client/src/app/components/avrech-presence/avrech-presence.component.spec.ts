import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvrechPresenceComponent } from './avrech-presence.component';

describe('AvrechPresenceComponent', () => {
  let component: AvrechPresenceComponent;
  let fixture: ComponentFixture<AvrechPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvrechPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvrechPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
