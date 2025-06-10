import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModuleFOrmComponent } from './list-module-form.component';

describe('ListModuleFOrmComponent', () => {
  let component: ListModuleFOrmComponent;
  let fixture: ComponentFixture<ListModuleFOrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListModuleFOrmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModuleFOrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
