import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListMainComponent } from './check-list-main.component';

describe('CheckListMainComponent', () => {
  let component: CheckListMainComponent;
  let fixture: ComponentFixture<CheckListMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
