import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitacionesComponent } from './habitaciones';

describe('HabitacionesComponent', () => {
  let component: HabitacionesComponent;
  let fixture: ComponentFixture<HabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitacionesComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(HabitacionesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});