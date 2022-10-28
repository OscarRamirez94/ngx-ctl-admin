import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeCapacityCreateComponent } from './transport-type-capacity-create.component';

describe('TransportTypeCapacityCreateComponent', () => {
  let component: TransportTypeCapacityCreateComponent;
  let fixture: ComponentFixture<TransportTypeCapacityCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportTypeCapacityCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeCapacityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
