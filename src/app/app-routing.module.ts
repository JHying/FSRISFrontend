import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    data: {title: '食品安全風險資訊系統', subtitle: 'Risk Information System on Food Safety.'}
  },
  {
    path: 'suggest',
    data: {title: '食品容許攝食量查詢', subtitle: 'Acceptable Food Consumption.'},
    loadChildren: './suggest/suggest.module#SuggestModule'
  },
  {
    path: 'riskRanking',
    data: {title: '風險分級排序查詢', subtitle: 'Risk Ranking and Risk Prioritization of Toxic Substances.'},
    loadChildren: './risk-ranking/risk-ranking.module#RiskRankModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload', // 同樣 url 時還是進行 reload
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules // loading時先顯示第一個頁面，再繼續prepload其他
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
