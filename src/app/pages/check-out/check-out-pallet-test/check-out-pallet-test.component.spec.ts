import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutPalletTestComponent } from './check-out-pallet-test.component';

describe('CheckOutPalletTestComponent', () => {
  let component: CheckOutPalletTestComponent;
  let fixture: ComponentFixture<CheckOutPalletTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutPalletTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutPalletTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
