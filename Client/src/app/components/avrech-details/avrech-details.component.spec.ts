import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvrechDetailsComponent } from './avrech-details.component';

describe('AvrechDetailsComponent', () => {
  let component: AvrechDetailsComponent;
  let fixture: ComponentFixture<AvrechDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvrechDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvrechDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
