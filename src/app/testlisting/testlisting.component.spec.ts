import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlistingComponent } from './testlisting.component';

describe('TestlistingComponent', () => {
  let component: TestlistingComponent;
  let fixture: ComponentFixture<TestlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestlistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
