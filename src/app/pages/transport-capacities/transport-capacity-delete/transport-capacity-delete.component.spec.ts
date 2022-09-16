import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCapacityDeleteComponent } from './transport-capacity-delete.component';

describe('TransportCapacityDeleteComponent', () => {
  let component: TransportCapacityDeleteComponent;
  let fixture: ComponentFixture<TransportCapacityDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportCapacityDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCapacityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
