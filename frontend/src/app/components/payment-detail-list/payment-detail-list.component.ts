import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css'],
})
export class PaymentDetailListComponent implements OnInit {
  constructor(
    public paymentDetailsService: PaymentDetailService,
    private alertMsg: ToastrService) {}

  ngOnInit(): void {
    this.paymentDetailsService.getPayments();
  }

  populateForm(item: PaymentDetail) {
    this.paymentDetailsService.paymentForm = Object.assign({}, item);
  }

  onDeleteData(id: number) {
    this.paymentDetailsService.deletePaymentDetail(id).subscribe(
      () => {
        this.paymentDetailsService.getPayments();
        this.alertMsg.warning('Record has been deleted', 'Payment Register');
      },
      (err) => { console.log(err); }
    );
  }
}
