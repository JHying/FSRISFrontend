import {RiskRankingComponent} from './risk-ranking.component';
import {PassDialogComponent} from './dialog/passDialog.component';
import {RiskRankRoutes} from './risk-ranking-routing.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    RiskRankingComponent,
    PassDialogComponent
  ],
  imports: [
    RouterModule.forChild(RiskRankRoutes),
    SharedModule
  ],
  providers: [],
  // dialog是動態產生元件的，因此我們需要在所屬Module中的entryComponents中加入要產生的component
  entryComponents: [PassDialogComponent],
  exports: [RouterModule]
})

export class RiskRankModule {}
