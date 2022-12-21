import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesMainComponent } from './cotizaciones-main.component';

describe('CotizacionesMainComponent', () => {
  let component: CotizacionesMainComponent;
  let fixture: ComponentFixture<CotizacionesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
