import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthcactGuard } from '../auth/authcact.guard';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    AuthcactGuard
  ]
})
export class MainModule { }
