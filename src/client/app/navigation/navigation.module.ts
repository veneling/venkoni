/*
import { NgModule } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { SidebarComponent } from './sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../loaders/material.module';
import { CvComponent } from './cv/cv.component';
import { ProjectsComponent } from './projects/projects.component';

const navRoutes: Routes = [
  { path: '', component: SidebarComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'cv', component: CvComponent },
      { path: 'projects' , component: ProjectsComponent }
    ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(navRoutes),
    MaterialModule
  ],
  declarations: [ 
    SidebarComponent, 
    AboutComponent, CvComponent, ProjectsComponent 
  ],

})

export class NavigationModule {}
*/