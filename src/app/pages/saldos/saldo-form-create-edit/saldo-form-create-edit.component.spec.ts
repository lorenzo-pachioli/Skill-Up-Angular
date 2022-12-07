import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoFormCreateEditComponent } from './saldo-form-create-edit.component';

describe('SaldoFormCreateEditComponent', () => {
  let component: SaldoFormCreateEditComponent;
  let fixture: ComponentFixture<SaldoFormCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaldoFormCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaldoFormCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
