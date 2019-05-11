import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
]

@NgModule({
  declarations: [
    LandingPageComponent,
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
    AuthGuard
  ]
})
export class MainModule { }
