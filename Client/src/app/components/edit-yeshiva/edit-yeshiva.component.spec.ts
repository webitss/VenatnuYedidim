import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYeshivaComponent } from './edit-yeshiva.component';

describe('EditYeshivaComponent', () => {
  let component: EditYeshivaComponent;
  let fixture: ComponentFixture<EditYeshivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditYeshivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYeshivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
