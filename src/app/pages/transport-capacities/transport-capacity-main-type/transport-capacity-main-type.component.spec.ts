import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCapacityMainTypeComponent } from './transport-capacity-main-type.component';

describe('TransportCapacityMainTypeComponent', () => {
  let component: TransportCapacityMainTypeComponent;
  let fixture: ComponentFixture<TransportCapacityMainTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportCapacityMainTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCapacityMainTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
