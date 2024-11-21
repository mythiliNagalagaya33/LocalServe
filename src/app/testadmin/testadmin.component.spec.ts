import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestadminComponent } from './testadmin.component';

describe('TestadminComponent', () => {
  let component: TestadminComponent;
  let fixture: ComponentFixture<TestadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
