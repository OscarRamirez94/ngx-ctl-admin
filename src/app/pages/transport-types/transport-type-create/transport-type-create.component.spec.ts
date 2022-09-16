import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeCreateComponent } from './transport-type-create.component';

describe('TransportTypeCreateComponent', () => {
  let component: TransportTypeCreateComponent;
  let fixture: ComponentFixture<TransportTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportTypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
