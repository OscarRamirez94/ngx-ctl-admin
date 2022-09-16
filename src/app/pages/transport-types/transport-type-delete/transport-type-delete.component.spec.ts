import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeDeleteComponent } from './transport-type-delete.component';

describe('TransportTypeDeleteComponent', () => {
  let component: TransportTypeDeleteComponent;
  let fixture: ComponentFixture<TransportTypeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportTypeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
