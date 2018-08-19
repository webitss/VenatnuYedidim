import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsUnionComponent } from './cards-union.component';

describe('CardsUnionComponent', () => {
  let component: CardsUnionComponent;
  let fixture: ComponentFixture<CardsUnionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsUnionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsUnionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
