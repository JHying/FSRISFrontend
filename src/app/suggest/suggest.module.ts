import {SuggestRoutes} from './suggest-routing.module';
import {SuggestComponent} from './suggest.component';
import {ConcDialogComponent} from './dialog/concDialog.component';
import {IntroDialogComponent} from './dialog/introDialog.component';
import {NgModule} from '@angular/core';
// Import FusionCharts library and chart modules
import {FusionChartsModule} from 'angular-fusioncharts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    SuggestComponent,
    ConcDialogComponent,
    IntroDialogComponent
  ],
  imports: [
    RouterModule.forChild(SuggestRoutes),
    FusionChartsModule,
    SharedModule
  ],
  providers: [],
  // dialog是動態產生元件的，因此我們需要在所屬Module中的entryComponents中加入要產生的component
  entryComponents: [ConcDialogComponent, IntroDialogComponent],
  exports: [RouterModule]
})

export class SuggestModule {}
