import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUbicacion } from './stock-ubicacion';

describe('StockUbicacion', () => {
  let component: StockUbicacion;
  let fixture: ComponentFixture<StockUbicacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockUbicacion],
    }).compileComponents();

    fixture = TestBed.createComponent(StockUbicacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
