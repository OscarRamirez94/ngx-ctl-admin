import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsDeleteComponent } from './professions-delete.component';

describe('ProfessionsDeleteComponent', () => {
  let component: ProfessionsDeleteComponent;
  let fixture: ComponentFixture<ProfessionsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
