import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutDetailDeleteComponent } from './check-out-detail-delete.component';

describe('CheckOutDetailDeleteComponent', () => {
  let component: CheckOutDetailDeleteComponent;
  let fixture: ComponentFixture<CheckOutDetailDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutDetailDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutDetailDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
