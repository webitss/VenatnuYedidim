import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvrechDiaryComponent } from './avrech-diary.component';

describe('AvrechDiaryComponent', () => {
  let component: AvrechDiaryComponent;
  let fixture: ComponentFixture<AvrechDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvrechDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvrechDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
