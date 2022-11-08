import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListDeleteComponent } from './check-list-delete.component';

describe('CheckListDeleteComponent', () => {
  let component: CheckListDeleteComponent;
  let fixture: ComponentFixture<CheckListDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
