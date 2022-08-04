import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewContactsComponent } from './view-contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: ViewContactsComponent },
];


@NgModule({
  declarations: [
    ViewContactsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ViewContactsModule { }
