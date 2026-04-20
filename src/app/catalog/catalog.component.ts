import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: any;
  filter: string = '';
  // private cartService: CartService = Inject(CartService);

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'] || '';
    });
  }

  getFilteredProducts(): IProduct[] {
    return this.filter === ''
      ? this.products
       :
    this.products.filter((product: IProduct) =>
      product.category.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  addToCart(product: IProduct): void {
    this.cartService.add(product);
    this.router.navigate(['/cart']);
  }
}
