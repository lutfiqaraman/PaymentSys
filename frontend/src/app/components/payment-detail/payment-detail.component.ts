import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  constructor(public paymentService: PaymentDetailService) {}

  ngOnInit(): void {
    this.restForm();
  }

  restForm(form?: NgForm): void {
    if (form != null) {
      form.resetForm();
    }

    this.paymentService.paymentForm = {
      PMId: 0,
      CardOwner: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: '',
    };
  }

  onSubmitData(form: NgForm) {
    this.paymentService.postPaymentDetail(form.value).subscribe(
      () => {
        this.restForm(form);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
