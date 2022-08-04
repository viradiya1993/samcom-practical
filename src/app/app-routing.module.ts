import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ContactsComponent } from './layouts/contacts/contacts.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'userlist',
    pathMatch: 'full',
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule)},
    ]
  }
  
];    

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
