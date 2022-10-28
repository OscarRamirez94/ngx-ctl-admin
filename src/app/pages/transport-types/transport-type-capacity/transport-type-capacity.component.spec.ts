import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeCapacityComponent } from './transport-type-capacity.component';

describe('TransportTypeCapacityComponent', () => {
  let component: TransportTypeCapacityComponent;
  let fixture: ComponentFixture<TransportTypeCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportTypeCapacityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
