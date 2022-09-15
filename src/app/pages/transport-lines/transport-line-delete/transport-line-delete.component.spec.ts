import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLineDeleteComponent } from './transport-line-delete.component';

describe('TransportLineDeleteComponent', () => {
  let component: TransportLineDeleteComponent;
  let fixture: ComponentFixture<TransportLineDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportLineDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportLineDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
