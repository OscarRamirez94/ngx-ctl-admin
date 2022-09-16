import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeMainComponent } from './transport-type-main.component';

describe('TransportTypeMainComponent', () => {
  let component: TransportTypeMainComponent;
  let fixture: ComponentFixture<TransportTypeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportTypeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
