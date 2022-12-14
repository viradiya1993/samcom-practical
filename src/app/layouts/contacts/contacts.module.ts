import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';


const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'view/:id', component: ViewContactsComponent }
  //{ path: 'view/:id', loadChildren: () => import('./view-contacts/view-contacts.module').then(m => m.ViewContactsModule)},
];

@NgModule({
  declarations: [
    ContactsComponent,
    ViewContactsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ContactsModule { }
