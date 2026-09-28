import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentacion/pages/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    loadChildren: () => import('./presentacion/pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }