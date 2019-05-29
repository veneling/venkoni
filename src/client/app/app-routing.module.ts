import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Routes, RouterModule } from '@angular/router';
import { MainModule } from './cvbuilder/main.module';
import { MaterialModule } from './loaders/material.module';

import { AboutComponent } from './navigation/about/about.component';
import { ProjectsComponent } from './navigation/projects/projects.component';
import { SidebarComponent } from './navigation/sidebar.component';
import { ResumeComponent } from './navigation/resume/resume.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthcactGuard } from './cvbuilder/auth/authcact.guard';
import { AuthService } from './cvbuilder/auth/auth.service';
import { AuthcloadGuard } from './cvbuilder/auth/authcload.guard';


const routes: Routes = [
  { path: '', component: SidebarComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'resume', component: ResumeComponent },
      { path: 'projects' , component: ProjectsComponent }
    ]},
  { path: 'cvbuilder', loadChildren: () => MainModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [ 
    SidebarComponent, 
    AboutComponent, ProjectsComponent, ResumeComponent
  ],
  providers:
  [
    AuthService,
    AuthcactGuard,
    AuthcloadGuard
  ]
})
export class AppRoutingModule { }
