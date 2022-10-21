import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletMainComponent } from './pallet-main.component';

describe('PalletMainComponent', () => {
  let component: PalletMainComponent;
  let fixture: ComponentFixture<PalletMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
