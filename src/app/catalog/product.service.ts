import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/products');
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('/api/categories');
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`/api/products/${id}`);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('/api/products', product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`/api/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`/api/products/${id}`);
  }

}
