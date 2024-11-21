import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderNotificationComponent } from './provider-notification.component';

describe('ProviderNotificationComponent', () => {
  let component: ProviderNotificationComponent;
  let fixture: ComponentFixture<ProviderNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
