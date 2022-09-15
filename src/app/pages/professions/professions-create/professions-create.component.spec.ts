import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsCreateComponent } from './professions-create.component';

describe('ProfessionsCreateComponent', () => {
  let component: ProfessionsCreateComponent;
  let fixture: ComponentFixture<ProfessionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
