import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCapacityMainComponent } from './transport-capacity-main.component';

describe('TransportCapacityMainComponent', () => {
  let component: TransportCapacityMainComponent;
  let fixture: ComponentFixture<TransportCapacityMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportCapacityMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCapacityMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
