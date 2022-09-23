import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListCreateComponent } from './check-list-create.component';

describe('CheckListCreateComponent', () => {
  let component: CheckListCreateComponent;
  let fixture: ComponentFixture<CheckListCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
