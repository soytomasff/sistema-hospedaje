import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaDiaria } from './caja-diaria';

describe('CajaDiaria', () => {
  let component: CajaDiaria;
  let fixture: ComponentFixture<CajaDiaria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CajaDiaria],
    }).compileComponents();

    fixture = TestBed.createComponent(CajaDiaria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
