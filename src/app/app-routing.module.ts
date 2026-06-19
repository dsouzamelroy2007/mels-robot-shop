import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { RegisterComponent } from './user/register/register.component';
import { OrdersComponent } from './user/orders/orders.component';
import { AuthGuard } from './auth/auth.guard';

const routes : Routes = [
  {path: 'home', component: HomeComponent, title: 'Home', canActivate: [AuthGuard]},
  {path: 'catalog', component: CatalogComponent, title: 'Catalog', canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, title: 'Cart', canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, title: 'Orders', canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent, title: 'Sign In'},
  {path: 'register', component: RegisterComponent, title: 'Register'},
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
