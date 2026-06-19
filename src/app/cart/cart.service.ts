import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface ICartItemResponse {
  product: IProduct;
  quantity: number;
  lineTotal: number;
}

interface ICartResponse {
  items: ICartItemResponse[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  loadCart() {
    this.http.get<ICartResponse>('/api/cart').subscribe({
      next: (cart) => this.cart.next(this.expandCart(cart)),
      error: () => this.cart.next([]),
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct) {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.http.post<ICartResponse>('/api/cart/items', { productId: product.id, quantity: 1 }).subscribe({
      next: (cart) => this.cart.next(this.expandCart(cart)),
      error: () => this.cart.next(this.cart.getValue().filter((item) => item !== product)),
    });
  }


  remove(product: IProduct) {
    let removed = false;
    let newCart = this.cart.getValue().filter((item) => {
      if (!removed && item.id === product.id) {
        removed = true;
        return false;
      }

      return true;
    });
    this.cart.next(newCart);
    this.http.delete<ICartResponse>(`/api/cart/items/${product.id}`).subscribe({
      next: (cart) => this.cart.next(this.expandCart(cart)),
      error: () => this.loadCart(),
    });
  }

  clear() {
    this.cart.next([]);
    this.http.delete('/api/cart').subscribe();
  }

  private expandCart(cart: ICartResponse): IProduct[] {
    return cart.items.flatMap((item) => Array(item.quantity).fill(item.product));
  }
}
