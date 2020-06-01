import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  url: string;
  paymentForm: PaymentDetail;

  constructor(private http: HttpClient) { }

  postPaymentDetail(paymentForm: PaymentDetail) {
    this.url = 'http://localhost:5000/api/paymentDetail';
    return this.http.post(this.url, paymentForm);
  }
}
