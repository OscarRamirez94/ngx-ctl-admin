import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsMainComponent } from './professions-main.component';

describe('ProfessionsMainComponent', () => {
  let component: ProfessionsMainComponent;
  let fixture: ComponentFixture<ProfessionsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
