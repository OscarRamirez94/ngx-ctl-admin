import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListPalletValidateComponent } from './check-list-pallet-validate.component';

describe('CheckListPalletValidateComponent', () => {
  let component: CheckListPalletValidateComponent;
  let fixture: ComponentFixture<CheckListPalletValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListPalletValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListPalletValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
