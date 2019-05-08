import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainModule } from './cvbuilder/main.module';
import { AboutComponent } from './navigation/about/about.component';
import { CvComponent } from './navigation/cv/cv.component';
import { ProjectsComponent } from './navigation/projects/projects.component';
import { SidebarComponent } from './navigation/sidebar.component';
import { MaterialModule } from './loaders/material.module';

const routes: Routes = [
  { path: '', component: SidebarComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'cv', component: CvComponent },
      { path: 'projects' , component: ProjectsComponent }
    ]},
  { path: 'cvbuilder', loadChildren: () => MainModule }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    MaterialModule],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
