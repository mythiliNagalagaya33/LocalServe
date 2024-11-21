import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSignupComponent } from './providersignup.component';

describe('ProvidersignupComponent', () => {
  let component: ProviderSignupComponent;
  let fixture: ComponentFixture<ProviderSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
