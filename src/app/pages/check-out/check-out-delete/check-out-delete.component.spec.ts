import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutDeleteComponent } from './check-out-delete.component';

describe('CheckOutDeleteComponent', () => {
  let component: CheckOutDeleteComponent;
  let fixture: ComponentFixture<CheckOutDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
