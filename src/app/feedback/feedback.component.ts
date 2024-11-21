import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  showFeedbackForm = true;
  feedbackForm!: FormGroup;
  bookingId: any | null;
  starsArray: number[] = [1, 2, 3, 4, 5];

  constructor(private feedbackService: FeedbackService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('booking_id');
    console.log('Retrieved bookingId:', this.bookingId);

    // Initialize the feedback form
    this.feedbackForm = new FormGroup({
      rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
      comments: new FormControl('', [Validators.required, Validators.maxLength(500)])
    });
  }

  // Method to set the rating based on user click
  rateExperience(rating: number): void {
    this.feedbackForm.controls['rating'].setValue(rating);
  }

  // Method to submit the feedback form
  submitFeedback(): void {
    if (this.feedbackForm.valid && this.bookingId) {
      const reviewData = {
        booking_id: this.bookingId,
        rating: this.feedbackForm.controls['rating'].value,
        comment: this.feedbackForm.controls['comments'].value
      };

      console.log('Review data:', reviewData);

      this.feedbackService.addReview(reviewData).subscribe(
        response => {
          console.log('Review submitted successfully:', response);
          alert('Review submitted successfully!');
          this.showFeedbackForm = false;
        },
        error => {
          console.error('Error submitting review:', error);
          alert('There was an error submitting your review. Please try again.');
        }
      );
    } else {
      console.log('Form is invalid');
      alert('Please provide a valid rating and comment.');
    }
  }

  closeFeedbackForm(): void {
    this.showFeedbackForm = false;
  }

  openFeedbackForm(): void {
    this.showFeedbackForm = true;
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { FeedbackService } from '../feedback.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-feedback',
//   templateUrl: './feedback.component.html',
//   styleUrls: ['./feedback.component.css']
// })
// export class FeedbackComponent implements OnInit {
//   showFeedbackForm = false;
//   feedbackForm!: FormGroup; // Using the non-null assertion operator to ensure TypeScript that this will be initialized
//   bookingId: any;  // Variable to store the booking ID from the URL
//   starsArray: number[] = [1, 2, 3, 4, 5];  
//   feedback = { rating: 0, comments: '' };

//   constructor(private feedbackService: FeedbackService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     // Retrieve the booking_id parameter from the URL
//     this.bookingId = this.route.snapshot.paramMap.get('booking_id');
//     console.log('Retrieved bookingId:', this.bookingId); 

//     // Initialize the feedback form only once, here in ngOnInit
//     this.feedbackForm = new FormGroup({
//       rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
//       comments: new FormControl('', [Validators.maxLength(500)])
//     });
//   }

//   // Method to set the rating based on user click
//   rateExperience(rating: number): void {
//     this.feedback.rating = rating;
//     this.feedbackForm.controls['rating'].setValue(rating);
//   }

//   // Method to submit the feedback form
//   submitFeedback(): void {
//     if (this.feedbackForm.valid) {
//       // Update feedback.comments from the form control
//       this.feedback.comments = this.feedbackForm.controls['comments'].value;

//       // Construct the review data to send
//       const reviewData = {
//         booking_id: this.bookingId, // Use the retrieved bookingId
//         rating: this.feedback.rating,
//         comment: this.feedback.comments
//       };

//       console.log('Review data:', reviewData);

//       // Call the feedback service to submit the review
//       this.feedbackService.addReview(reviewData).subscribe(
//         response => {
//           console.log('Review submitted successfully:', response);
//           alert('Review submitted successfully!');
//           this.showFeedbackForm = false; // Close the form on success
//         },
//         error => {
//           console.error('Error submitting review:', error);
//           alert('There was an error submitting your review. Please try again.');
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//       alert('Please provide a valid rating and comments.');
//     }
//   }

//   closeFeedbackForm(): void {
//     this.showFeedbackForm = false;
//   }

//   openFeedbackForm(): void {
//     this.showFeedbackForm = true;
//   }
// }
