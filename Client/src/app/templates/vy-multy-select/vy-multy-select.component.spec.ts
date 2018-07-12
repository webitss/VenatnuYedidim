import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VyMultySelectComponent } from './vy-multy-select.component';

describe('VyMultySelectComponent', () => {
  let component: VyMultySelectComponent;
  let fixture: ComponentFixture<VyMultySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VyMultySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VyMultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
