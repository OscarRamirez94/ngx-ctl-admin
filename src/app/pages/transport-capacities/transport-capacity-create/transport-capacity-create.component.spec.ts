import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCapacityCreateComponent } from './transport-capacity-create.component';

describe('TransportCapacityCreateComponent', () => {
  let component: TransportCapacityCreateComponent;
  let fixture: ComponentFixture<TransportCapacityCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportCapacityCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCapacityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
