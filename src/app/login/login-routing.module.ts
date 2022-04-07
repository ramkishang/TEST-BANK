import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { Route, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Route[] = [
  {
    children: [
      {
        component: LoginComponent,
        path: ''
      },
    ],
    component: AuthComponent,
    path: '',
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
      RouterModule.forChild(routes),
  ],
})
export class LoginRoutingModule { }
