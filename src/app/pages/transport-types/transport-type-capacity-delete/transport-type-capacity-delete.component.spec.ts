import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeCapacityDeleteComponent } from './transport-type-capacity-delete.component';

describe('TransportTypeCapacityDeleteComponent', () => {
  let component: TransportTypeCapacityDeleteComponent;
  let fixture: ComponentFixture<TransportTypeCapacityDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportTypeCapacityDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeCapacityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
