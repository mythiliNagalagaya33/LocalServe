import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsUserComponent } from './bookings-user.component';

describe('BookingsUserComponent', () => {
  let component: BookingsUserComponent;
  let fixture: ComponentFixture<BookingsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
