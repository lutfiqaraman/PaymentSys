import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  constructor(
    public paymentService: PaymentDetailService,
    private alertMsg: ToastrService
  ) {}

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
    if (this.paymentService.paymentForm.PMId === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.paymentService.postPaymentDetail().subscribe(
      () => {
        this.restForm(form);
        this.alertMsg.success('Submitted successfully', 'Payment Register');
        this.paymentService.getPayments();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.paymentService.putPaymentDetail().subscribe(
      () => {
        this.restForm(form);
        this.alertMsg.info('Updated successfully', 'Payment Register');
        this.paymentService.getPayments();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
