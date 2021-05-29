import {Routes} from '@angular/router';
import {RiskRankingComponent} from './risk-ranking.component';
import {PassDialogComponent} from './dialog/passDialog.component';
import {UnsavedGuard} from '../utils/unsavedGuard';

export const RiskRankRoutes: Routes = [
  {
    path: '', // 設定根目錄為這一層
    component: RiskRankingComponent,
    canDeactivate: [UnsavedGuard],
    children: [
      {path: '', component: PassDialogComponent}
    ]
  }
];

