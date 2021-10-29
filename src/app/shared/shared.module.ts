import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchFilterPipe } from './searchFilter.pipe';

@NgModule({
  declarations: [
    PaginationComponent,
    SearchFilterPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    PaginationComponent,
    MatPaginatorModule,
    SearchFilterPipe
  ]
})
export class SharedModule { }
