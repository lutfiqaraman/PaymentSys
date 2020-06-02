import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  url: string;
  paymentForm: PaymentDetail;
  list: PaymentDetail[];

  constructor(private http: HttpClient) {}

  // Insert new payment
  postPaymentDetail() {
    this.url = 'http://localhost:5000/api/PaymentDetail';
    return this.http.post(this.url, this.paymentForm);
  }

  // Update a payment
  putPaymentDetail() {
    this.url = 'http://localhost:5000/api/PaymentDetail/';
    return this.http.put(this.url + this.paymentForm.PMId, this.paymentForm);
  }

  // Delete a payment
  deletePaymentDetail(id: number) {
    this.url = 'http://localhost:5000/api/PaymentDetail/';
    return this.http.delete(this.url + id);
  }

  getPayments() {
    this.url = 'http://localhost:5000/api/PaymentDetail';
    return this.http
      .get(this.url)
      .toPromise()
      .then((res) => {
        this.list = res as PaymentDetail[];
      });
  }
}
