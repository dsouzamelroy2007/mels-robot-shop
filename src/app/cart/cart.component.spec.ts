import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CartComponent } from './cart.component';
import { CartService } from './cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getCart', 'remove']);

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
      ]
    });

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    cartService.getCart.and.returnValue(of([]));

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
