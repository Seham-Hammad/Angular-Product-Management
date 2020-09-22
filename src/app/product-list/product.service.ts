import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl ='api/products/products.json';
 
  constructor(private http: HttpClient) { }

  getProducts():Observable <IProduct[]>{
    return this.http.get<IProduct[]>(this.baseUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  handleError(error){
    let errorMessage ='';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Eroor: ${error.error.message}`;
    } else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
