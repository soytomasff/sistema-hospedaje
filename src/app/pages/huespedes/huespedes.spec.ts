import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HuespedesComponent } from './huespedes';

describe('HuespedesComponent', () => {
  let component: HuespedesComponent;
  let fixture: ComponentFixture<HuespedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HuespedesComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HuespedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});