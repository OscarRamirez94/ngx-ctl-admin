import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListPalletCloseComponent } from './check-list-pallet-close.component';

describe('CheckListPalletCloseComponent', () => {
  let component: CheckListPalletCloseComponent;
  let fixture: ComponentFixture<CheckListPalletCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListPalletCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListPalletCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
