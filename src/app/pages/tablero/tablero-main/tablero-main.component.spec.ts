import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroMainComponent } from './tablero-main.component';

describe('TableroMainComponent', () => {
  let component: TableroMainComponent;
  let fixture: ComponentFixture<TableroMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
