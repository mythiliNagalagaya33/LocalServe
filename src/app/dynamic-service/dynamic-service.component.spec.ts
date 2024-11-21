import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicServiceComponent } from './dynamic-service.component';

describe('DynamicServiceComponent', () => {
  let component: DynamicServiceComponent;
  let fixture: ComponentFixture<DynamicServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
