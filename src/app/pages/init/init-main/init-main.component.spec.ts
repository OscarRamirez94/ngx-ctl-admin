import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitMainComponent } from './init-main.component';

describe('InitMainComponent', () => {
  let component: InitMainComponent;
  let fixture: ComponentFixture<InitMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
