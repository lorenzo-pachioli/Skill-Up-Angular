import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillResponseComponent } from './bill-response.component';

describe('BillResponseComponent', () => {
  let component: BillResponseComponent;
  let fixture: ComponentFixture<BillResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
