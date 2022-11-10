import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutCreateComponent } from './check-out-create.component';

describe('CheckOutCreateComponent', () => {
  let component: CheckOutCreateComponent;
  let fixture: ComponentFixture<CheckOutCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
