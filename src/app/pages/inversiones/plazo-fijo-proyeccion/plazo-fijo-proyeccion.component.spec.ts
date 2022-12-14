import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazoFijoProyeccionComponent } from './plazo-fijo-proyeccion.component';

describe('PlazoFijoProyeccionComponent', () => {
  let component: PlazoFijoProyeccionComponent;
  let fixture: ComponentFixture<PlazoFijoProyeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazoFijoProyeccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlazoFijoProyeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
