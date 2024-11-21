import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProvidersComponent } from './pending-providers.component';

describe('PendingProvidersComponent', () => {
  let component: PendingProvidersComponent;
  let fixture: ComponentFixture<PendingProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingProvidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
