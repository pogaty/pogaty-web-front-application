import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCollabrationComponent } from './login-collabration.component';

describe('LoginCollabrationComponent', () => {
  let component: LoginCollabrationComponent;
  let fixture: ComponentFixture<LoginCollabrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginCollabrationComponent]
    });
    fixture = TestBed.createComponent(LoginCollabrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
