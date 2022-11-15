import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutPalletViewComponent } from './check-out-pallet-view.component';

describe('CheckOutPalletViewComponent', () => {
  let component: CheckOutPalletViewComponent;
  let fixture: ComponentFixture<CheckOutPalletViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutPalletViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutPalletViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
