import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './login/component/admin-login/admin-login.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { HeaderComponent } from './layout/component/header/header.component';
import { FooterComponent } from './layout/component/footer/footer.component';
import { SideBarComponent } from './layout/component/side-bar/side-bar.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyTransactionsComponent } from './my-transactions/my-transactions.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { TrasactionDetailsComponent } from './trasaction-details/trasaction-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLoginComponent,
    HomeComponent,
    BaseLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    CreateCustomerComponent,
    CustomerMasterComponent,
    MyAccountComponent,
    MyTransactionsComponent,
    SendMoneyComponent,
    TrasactionDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
