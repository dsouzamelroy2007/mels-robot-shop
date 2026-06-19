import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder, IShippingAddress } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  checkout(shippingAddress: IShippingAddress): Observable<IOrder> {
    return this.http.post<IOrder>('/api/checkout', { shippingAddress });
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>('/api/orders');
  }
}
