import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { IProduct } from "./product";
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle  = 'Product List';
  showImage  = false;
  _listFilter: string;
  errorMessage = '';

  constructor(private service: ProductService) { }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
  get listFilter(): string{
    return this._listFilter;
  }
  
 set listFilter(value : string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  
  filteredProducts:  IProduct[] =[];
  products : IProduct [] =[];

  toggleImage(){
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => 
    product.productName.toLocaleLowerCase().indexOf(filterBy) ! == -1);
  }

  ngOnInit(): void {
   this.service.getProducts().subscribe({
     next:products => {
       this.products = products;
       this.filteredProducts = this.products;
       console.log(this.products);
       },
       error: err => this.errorMessage = err
  });
 
  }
}
