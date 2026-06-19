import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CartComponent } from './cart.component';
import { CartService } from './cart.service';
import { OrderService } from '../user/orders/order.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCart', 'loadCart', 'remove']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['checkout']);

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [FormsModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
      ]
    });

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    cartService.getCart.and.returnValue(of([]));
    orderService.checkout.and.returnValue(of({} as any));

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
