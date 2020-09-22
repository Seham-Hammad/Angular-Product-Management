import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from "./shared/convert-to-spaces.pipe";
import { StarComponent } from './shared/star/star.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './products/product-detail.guard';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailsComponent,
    WelcomeComponent

  ],
  imports: [

  BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'products', component: ProductListComponent},
      {
        path:'products/:id', 
        canActivate: [ProductDetailGuard],
         component: ProductDetailsComponent
        },
      {path:'welcome', component: WelcomeComponent},
      {path:'', component: WelcomeComponent},
      {path:'**', redirectTo:'welcome', pathMatch:'full'}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
