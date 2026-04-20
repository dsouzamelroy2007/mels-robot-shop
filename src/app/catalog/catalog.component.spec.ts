import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CatalogComponent } from './catalog.component';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;

  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['add']);
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    const activatedRouteSpy = {
      queryParams: of({})
    };

    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ]
    });

    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    productService.getProducts.and.returnValue(of([]));

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
