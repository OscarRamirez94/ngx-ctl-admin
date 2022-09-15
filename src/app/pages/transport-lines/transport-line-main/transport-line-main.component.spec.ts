import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLineMainComponent } from './transport-line-main.component';

describe('TransportLineMainComponent', () => {
  let component: TransportLineMainComponent;
  let fixture: ComponentFixture<TransportLineMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportLineMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportLineMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
