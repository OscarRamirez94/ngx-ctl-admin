import { PersonsMainComponent } from './persons-main.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';



describe('PersonsMainComponent', () => {
  let component: PersonsMainComponent;
  let fixture: ComponentFixture<PersonsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
