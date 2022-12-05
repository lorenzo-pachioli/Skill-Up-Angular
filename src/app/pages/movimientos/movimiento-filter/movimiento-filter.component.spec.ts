import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoFilterComponent } from './movimiento-filter.component';

describe('MovimientoFilterComponent', () => {
  let component: MovimientoFilterComponent;
  let fixture: ComponentFixture<MovimientoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
