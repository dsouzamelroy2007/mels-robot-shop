import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { IProduct } from '../catalog/product.model';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct: IProduct = {
    id: 1,
    name: 'Test Product',
    description: 'A test product',
    category: 'test',
    price: 10,
    imageName: 'test.jpg',
    discount: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent]
    });
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    component.productDetail = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have buy output event emitter', () => {
    spyOn(component.buy, 'emit');
    component.buyProduct(mockProduct);
    expect(component.buy.emit).toHaveBeenCalled();
  });

  it('should generate correct image URL', () => {
    const url = component.getImageUrl(mockProduct);
    expect(url).toContain('/assets/images/robot-parts/test.jpg');
  });
});
