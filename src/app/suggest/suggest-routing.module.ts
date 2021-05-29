import {Routes} from '@angular/router';
import {ConcDialogComponent} from './dialog/concDialog.component';
import {IntroDialogComponent} from './dialog/introDialog.component';
import {SuggestComponent} from './suggest.component';
import {UnsavedGuard} from '../utils/unsavedGuard';

export const SuggestRoutes: Routes = [
  {
    path: '', // 設定根目錄為這一層
    component: SuggestComponent,
    canDeactivate: [UnsavedGuard],
    // suggest 包含的小元件
    children: [
      {path: '', component: ConcDialogComponent},
      {path: '', component: IntroDialogComponent}
    ]
  }
];

