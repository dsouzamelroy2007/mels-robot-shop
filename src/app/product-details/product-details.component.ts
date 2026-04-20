import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() productDetail!: IProduct;
  @Output() buy = new EventEmitter<IProduct>();

  getImageUrl(product: IProduct): string {
    return `/assets/images/robot-parts/${product.imageName}`;
  }

  getDiscountClass(product: IProduct): string|string[]|null {
    if (product.discount !== 0) {
      return ['strikethrough'];
    }
    return null;
  }

  buyProduct(product: IProduct): void {
    this.buy.emit();
  }
}
