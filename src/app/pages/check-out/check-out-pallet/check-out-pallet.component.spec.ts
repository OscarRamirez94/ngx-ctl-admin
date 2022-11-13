import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutPalletComponent } from './check-out-pallet.component';

describe('CheckOutPalletComponent', () => {
  let component: CheckOutPalletComponent;
  let fixture: ComponentFixture<CheckOutPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutPalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
