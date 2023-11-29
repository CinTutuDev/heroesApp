import { AuthRoutingModule } from './auth.routing.module';
import { CommonModule } from '@angular/common';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [
    LayoutPagesComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
