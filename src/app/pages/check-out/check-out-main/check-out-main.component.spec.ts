import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutMainComponent } from './check-out-main.component';

describe('CheckOutMainComponent', () => {
  let component: CheckOutMainComponent;
  let fixture: ComponentFixture<CheckOutMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
