import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDeleteComponent } from './persons-delete.component';

describe('PersonsDeleteComponent', () => {
  let component: PersonsDeleteComponent;
  let fixture: ComponentFixture<PersonsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonsDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
