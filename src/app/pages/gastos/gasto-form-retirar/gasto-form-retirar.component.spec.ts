import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoFormRetirarComponent } from './gasto-form-retirar.component';

describe('GastoFormRetirarComponent', () => {
  let component: GastoFormRetirarComponent;
  let fixture: ComponentFixture<GastoFormRetirarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastoFormRetirarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastoFormRetirarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
