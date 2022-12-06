import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoFormCreateEditComponent } from './gasto-form-create-edit.component';

describe('GastoFormCreateEditComponent', () => {
  let component: GastoFormCreateEditComponent;
  let fixture: ComponentFixture<GastoFormCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastoFormCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastoFormCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
