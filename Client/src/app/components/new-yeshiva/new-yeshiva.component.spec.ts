import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYeshivaComponent } from './new-yeshiva.component';

describe('NewYeshivaComponent', () => {
  let component: NewYeshivaComponent;
  let fixture: ComponentFixture<NewYeshivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewYeshivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewYeshivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
