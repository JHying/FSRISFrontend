import {NgModule} from '@angular/core';
import {StrFilterPipe} from '../utils/strFilterPipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatProgressSpinnerModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {UnsavedGuard} from '../utils/unsavedGuard';

@NgModule({
  declarations: [
    StrFilterPipe
  ],
  imports: [
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  // 注入任何service或utils
  providers: [UnsavedGuard],
  exports: [
    StrFilterPipe,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})

export class SharedModule {}
