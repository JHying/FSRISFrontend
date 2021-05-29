import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService} from '../service/httpclient.service';
import {forkJoin} from 'rxjs/index';
import {
  FoodPassListI, RiskRankReq, RiskRankReqI, RiskRankRsp, RiskRankRspI,
  ScoreDetailListI
} from '../interface/riskRankI';
import {MatDialog} from '@angular/material';
import {PassDialogComponent} from './dialog/passDialog.component';
import {Utils} from '../utils/utils';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {KeyValue} from '@angular/common';
import * as ls from 'local-storage';

@Component({
  selector: 'app-risk-ranking',
  templateUrl: './risk-ranking.component.html',
  styleUrls: ['./risk-ranking.component.css']
})
export class RiskRankingComponent implements OnInit, OnDestroy {

  rank1: any[];
  rank2: any[];
  riskRankRsp: RiskRankRspI = new RiskRankRsp();
  scoreDetailList: ScoreDetailListI[];
  foodPassList: FoodPassListI[];
  submitted = false;
  loading = false;
  noData = false;
  searchForm = this.fb.group({
    subs1select: ['', Validators.required],
    subs2select: [''],
  });

  constructor(private httpService: HttpClientService, private dialog: MatDialog,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.initForm();
    this.onChanges();
    this.submitted = false;
    this.loading = false;
    this.noData = false;

    if (ls.get<any>('form') != null) {
      this.searchForm.setValue(ls.get<any>('form'));
    }
  }

  ngOnDestroy() {
    // // localstorage remove
    ls.clear();
  }

  private initForm() {
    const getRank1 = this.httpService.httpGet('/initFirstSubs');
    const getRank2 = this.httpService.httpGet('/initSecondSubs');
    forkJoin([getRank1, getRank2])
      .subscribe(
        (data: any) => {
          this.rank1 = data[0];
          this.rank2 = data[1];
        }
      );
  }

  // Preserve original property order
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

// Order by ascending property value
  valueAscOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.value.localeCompare(b.value);
  }

// Order by descending property key
  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  onChanges() {
    this.searchForm.get('subs1select').valueChanges.subscribe(val => {
      this.searchForm.get('subs2select').setValue('');
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.searchForm.controls;
  }

  searchClick() {
    // 清除上次查詢資料
    this.riskRankRsp = new RiskRankRsp();
    this.foodPassList = null;
    this.scoreDetailList = null;
    this.submitted = true;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      this.noData = false;
      return;
    }
    this.loading = true;
    const riskRankReq: RiskRankReqI = new RiskRankReq();
    if (this.searchForm.value.subs2select !== '') {
      riskRankReq.SmainId = this.searchForm.value.subs2select;
    } else {
      riskRankReq.SmainId = this.searchForm.value.subs1select;
    }

    // if search then do localstorage setting to remember form value
    ls.set<any>('form', this.searchForm.value);

    this.httpService.httpPost('/RiskRank', riskRankReq)
      .subscribe((data: any) => {
        this.riskRankRsp = data;
        // console.log(data);
        if (this.riskRankRsp.FoodPassList.length > 0 && this.riskRankRsp.ScoreDetailList.length > 0) {
          this.noData = false;
          this.foodPassList = this.riskRankRsp.FoodPassList;
          this.scoreDetailList = this.riskRankRsp.ScoreDetailList
            .filter(element => element.Total !== 0);
        } else if (this.riskRankRsp.FoodPassList.length > 0) {
          this.noData = false;
          this.foodPassList = this.riskRankRsp.FoodPassList;
        } else if (this.riskRankRsp.ScoreDetailList.length > 0) {
          this.noData = false;
          this.scoreDetailList = this.riskRankRsp.ScoreDetailList
            .filter(element => element.Total !== 0);
        } else {
          this.noData = true;
        }
        this.loading = false;
      });
  }

  passDetailClick(pass: FoodPassListI) {
    // 點濃度檢測明細
    const id = pass.SubsName;
    const title = pass.FoodNameCh + '中的' + pass.SubsNameCh + '-超標率明細';
    this.dialog.open(PassDialogComponent, Utils.myDialogConfig(id, title, pass.FoodConcList));
  }

}
