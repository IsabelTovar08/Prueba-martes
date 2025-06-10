import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserRolComponent } from './form-user-rol.component';

describe('FormUserRolComponent', () => {
  let component: FormUserRolComponent;
  let fixture: ComponentFixture<FormUserRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUserRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUserRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
