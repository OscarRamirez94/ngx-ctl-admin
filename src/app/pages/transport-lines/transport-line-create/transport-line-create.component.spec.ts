import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLineCreateComponent } from './transport-line-create.component';

describe('TransportLineCreateComponent', () => {
  let component: TransportLineCreateComponent;
  let fixture: ComponentFixture<TransportLineCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportLineCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportLineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
