import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchFilterPipe } from './searchFilter.pipe';

@NgModule({
  declarations: [
    PaginationComponent,
    SearchFilterPipe,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationComponent,
    MatPaginatorModule,
    SearchFilterPipe
  ]
})
export class SharedModule { }
