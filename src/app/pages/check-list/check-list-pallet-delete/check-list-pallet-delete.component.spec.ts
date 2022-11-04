import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListPalletDeleteComponent } from './check-list-pallet-delete.component';

describe('CheckListPalletDeleteComponent', () => {
  let component: CheckListPalletDeleteComponent;
  let fixture: ComponentFixture<CheckListPalletDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListPalletDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListPalletDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
