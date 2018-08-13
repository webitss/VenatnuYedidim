import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMediaComponent } from './event-media.component';

describe('EventMediaComponent', () => {
  let component: EventMediaComponent;
  let fixture: ComponentFixture<EventMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
