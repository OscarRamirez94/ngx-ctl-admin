import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListPalletCreateComponent } from './check-list-pallet-create.component';

describe('CheckListPalletCreateComponent', () => {
  let component: CheckListPalletCreateComponent;
  let fixture: ComponentFixture<CheckListPalletCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListPalletCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListPalletCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
