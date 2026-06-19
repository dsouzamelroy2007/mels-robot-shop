import { Component } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { CartService } from './cart.service';
import { IOrder, IShippingAddress } from '../user/orders/order.model';
import { OrderService } from '../user/orders/order.service';

@Component({
  selector: 'bot-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private cart: IProduct[] = [];
  checkoutError = '';
  completedOrder: IOrder | null = null;
  shippingAddress: IShippingAddress = {
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  };
  
  constructor(private cartService: CartService, private orderService: OrderService) { }
  
  ngOnInit() {
    this.cartService.loadCart();
    this.cartService.getCart().subscribe({
      next: (cart) => (this.cart = cart),
    });
  }  

  get cartItems() {
    return this.cart;
  }

  get cartTotal() {
    return this.cart.reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0);
  }

  removeFromCart(product: IProduct) {
    this.cartService.remove(product);
  }

  checkout() {
    this.checkoutError = '';
    this.completedOrder = null;
    this.orderService.checkout(this.shippingAddress).subscribe({
      next: (order) => {
        this.completedOrder = order;
        this.cartService.loadCart();
      },
      error: (err) => {
        this.checkoutError =
          err?.error?.message || 'Checkout failed. Please try again.';
      },
    });
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
  }
}
