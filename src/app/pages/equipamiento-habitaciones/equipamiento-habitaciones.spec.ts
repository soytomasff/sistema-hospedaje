import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamientoHabitaciones } from './equipamiento-habitaciones';

describe('EquipamientoHabitaciones', () => {
  let component: EquipamientoHabitaciones;
  let fixture: ComponentFixture<EquipamientoHabitaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipamientoHabitaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipamientoHabitaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
