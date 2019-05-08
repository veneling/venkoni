import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingPageComponent }
]

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MainModule { }
