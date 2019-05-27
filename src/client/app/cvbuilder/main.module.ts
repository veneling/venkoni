import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AuthcactGuard } from './auth/authcact.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MaterialModule } from '../loaders/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthcactGuard] },
  { path: 'cvbuilder', component: DashboardComponent, canActivate: [AuthcactGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'cvbuilder' }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
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
