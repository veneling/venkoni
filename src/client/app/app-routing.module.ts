import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Routes, RouterModule } from '@angular/router';
import { MainModule } from './cvbuilder/main.module';
import { MaterialModule } from './loaders/material.module';

import { AboutComponent } from './navigation/about/about.component';
import { CvComponent } from './navigation/cv/cv.component';
import { ProjectsComponent } from './navigation/projects/projects.component';
import { SidebarComponent } from './navigation/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthcactGuard } from './auth/authcact.guard';
import { AuthService } from './auth/auth.service';
import { AuthcloadGuard } from './auth/authcload.guard';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: SidebarComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'cv', component: CvComponent },
      { path: 'projects' , component: ProjectsComponent }
    ]},
  { path: 'cvbuilder', loadChildren: () => MainModule, canLoad: [AuthcloadGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [ 
    SidebarComponent, 
    AboutComponent, CvComponent, ProjectsComponent, LoginComponent, RegisterComponent
  ],
  providers:
  [
    AuthService,
    AuthcactGuard,
    AuthcloadGuard
  ]
})
export class AppRoutingModule { }
