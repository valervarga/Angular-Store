import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductData } from '../../interfaces/Product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  editedProduct: Product;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getAll().subscribe(
      (result: ProductData) => this.products = result && result.data ? result.data : this.products,
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }

  // CREATE
  createProduct(product: Product) {
    // Create product and add to DB
    this.productService.createOne(product).subscribe((newProduct: any) => {
      if (!newProduct && !newProduct.data) return;
      
      // Update UI with new product
      this.products.push(newProduct.data);
    });
  }

  // UPDATE
  updateProduct(product: Product) {
    this.editedProduct = product;
  }

  // DELETE
  removeProduct(product: Product) {
    // Remove product from UI
    this.products = this.products.filter(filteredProduct => filteredProduct._id !== product._id);
    // Remove product from DB
    this.productService.removeOne(product).subscribe();
  }
}
