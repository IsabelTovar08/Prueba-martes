import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserRolComponent } from './list-user-rol.component';

describe('ListUserRolComponent', () => {
  let component: ListUserRolComponent;
  let fixture: ComponentFixture<ListUserRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUserRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
