import { Component } from '@angular/core';
import { IOrder } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'bot-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders: IOrder[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.orders = [];
        this.loading = false;
      },
    });
  }
}
