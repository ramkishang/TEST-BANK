import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/component/login/login.component'; 
import { AuthGuard } from './core/helpers/auth.guard';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { AdminLoginComponent } from './login/component/admin-login/admin-login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyTransactionsComponent } from './my-transactions/my-transactions.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { TrasactionDetailsComponent } from './trasaction-details/trasaction-details.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "adminLogin",
    component: AdminLoginComponent,
  },
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent,
      },
      {
        path:'create',
        canActivate: [AuthGuard],
        component: CreateCustomerComponent,
      },
      {
        path:'create/:id',
        canActivate: [AuthGuard],
        component: CreateCustomerComponent,
      },
      {
        path:'customer',
        canActivate: [AuthGuard],
        component: CustomerMasterComponent,
      },
      {
        path:'account',
        canActivate: [AuthGuard],
        component: MyAccountComponent,
      },
      {
        path:'transactions',
        canActivate: [AuthGuard],
        component: MyTransactionsComponent,
      },
      {
        path:'send-money',
        canActivate: [AuthGuard],
        component: SendMoneyComponent,
      },
      {
        path:'transaction-details/:id',
        canActivate: [AuthGuard],
        component: TrasactionDetailsComponent
        ,
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
