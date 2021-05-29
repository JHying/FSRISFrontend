import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClientService} from '../service/httpclient.service';
import {Utils} from '../utils/utils';
import {forkJoin} from 'rxjs/index';
import {
  FoodConcListI, FoodSubsDetail, FoodSubsDetailListI, FoodSubsListI, RecommendReq, RecommendReqI, RecommendRsp,
  RecommendRspI, UnitRsp, UnitRspI
} from '../interface/foodRecI';
import {MatDialog} from '@angular/material';
import {ConcDialogComponent} from './dialog/concDialog.component';
import {IntroDialogComponent} from './dialog/introDialog.component';
import {SubsRiskReq, SubsRiskReqI, SubsRiskRsp, SubsRiskRspI} from '../interface/subsRiskI';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import * as ls from 'local-storage';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})


export class SuggestComponent implements OnInit, OnDestroy {

  subsTab;
  recSubs: string;
  food1: any[];
  food2: any[];
  food3: any[];
  unitRsp: UnitRspI = new UnitRsp();
  food3choosed: string;
  recRsp: RecommendRspI = new RecommendRsp();
  foodSubsList: FoodSubsListI[];
  foodDetailList: FoodSubsDetailListI[];
  foodConcList: FoodConcListI[];
  subsRiskRsp: SubsRiskRspI = new SubsRiskRsp();
  personalRisk: object; // 初始化圖表
  // regulationRisk: object = Utils.fusionChartsGuage(); // 初始化圖表
  subsChoosed: string;
  submitted = false;
  loading = false;
  noSubs = false;
  noRisk = false;
  noMRL = null;
  searchForm = this.fb.group({
    weight: ['', [Validators.required, Validators.pattern(/^[0-9]+\.{0,1}[0-9]{0,5}$/)]],
    food1select: ['A', Validators.required],
    food2select: ['', Validators.required],
    food3select: ['', Validators.required],
    quant: ['', Validators.pattern(/^[0-9]+\.{0,1}[0-9]{0,5}$/)],
    age: ['', Validators.pattern(/^[0-9]*$/)],
    gender: ['W', Validators.required]
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
    this.noSubs = false;
    this.noRisk = false;

    if (ls.get<any>('form') != null) {
      this.searchForm.setValue(ls.get<any>('form'));
      this.initFoodUnit();
    }
  }

  ngOnDestroy() {
    // // localstorage remove
    ls.clear();
  }

  initFoodUnit() {
    this.unitRsp = new UnitRsp();
    const foodid = this.searchForm.value.food3select;
    if (foodid !== '') {
      this.httpService.httpGet('/initFoodUnit/' + foodid)
        .subscribe((data: any) => {
          this.unitRsp = data;
        });
    }
  }

  private initForm() {
    const getFood1 = this.httpService.httpGet('/initFirstFood');
    const getFood2 = this.httpService.httpGet('/initSecondFood');
    const getFood3 = this.httpService.httpGet('/initThirdFood');
    forkJoin([getFood1, getFood2, getFood3])
      .subscribe(
        (data: any) => {
          this.food1 = data[0];
          this.food2 = data[1];
          this.food3 = data[2];
        }
      );
  }

  //noinspection JSAnnotator
  clickActiveTab(activeTab, activeTarget) {
    activeTab = activeTarget;
    this.subsTab = activeTab;
    this.noMRL = null;
    const found = this.foodSubsList.find(element => element.SubsClassName === activeTarget);
    if (found != null) {
      this.foodDetailList = found.FoodSubsDetailList;
      this.noMRL = this.foodDetailList.find(element => element.SubsMrl.includes('從缺'));
      this.foodConcList = found.FoodConcList;
    }
  }

  // 選擇欲查詢食品
  onChanges() {
    this.searchForm.get('food1select').valueChanges.subscribe(val => {
      this.searchForm.get('food2select').setValue('');
      this.unitRsp = new UnitRsp();
    });

    this.searchForm.get('food2select').valueChanges.subscribe(val => {
      this.searchForm.get('food3select').setValue('');
      this.unitRsp = new UnitRsp();
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.searchForm.controls;
  }

  searchClick() {
    this.submitted = true;
    // this.submitted = false;
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      this.noSubs = false;
      return;
    }

    this.loading = true;
    this.recRsp = new RecommendRsp();
    this.subsRiskRsp = new SubsRiskRsp();
    this.noMRL = null;
    const recReq: RecommendReqI = new RecommendReq();
    recReq.BodyWeight = this.searchForm.value.weight;
    recReq.Foodid = this.searchForm.value.food3select;

    // if search then do localstorage setting to remember form value
    ls.set<any>('form', this.searchForm.value);

    this.httpService.httpPost('/Recommend', recReq)
      .subscribe((data: any) => {
        this.recRsp = data || new RecommendRsp();
        this.foodSubsList = this.recRsp.FoodSubsList || [];
        if (this.foodSubsList.length > 0) {
          this.noSubs = false;
          // 以查詢結果第一項為初始化狀態
          this.subsTab = this.foodSubsList[0].SubsClassName;
          this.foodDetailList = this.foodSubsList[0].FoodSubsDetailList;
          this.noMRL = this.foodDetailList.find(element => element.SubsMrl.includes('從缺'));
          this.foodConcList = this.foodSubsList[0].FoodConcList;
          // 以計算容許攝食量的毒化物取得風險分析內容
          const foodSubsDetail: FoodSubsDetailListI = new FoodSubsDetail();
          // 點毒化物風險
          foodSubsDetail.Subsid = this.recRsp.FoodIntakeCommmend.Subsid;
          foodSubsDetail.SubsName = this.recRsp.FoodIntakeCommmend.SubsName;
          this.recSubs = foodSubsDetail.SubsName;
          this.riskClick(foodSubsDetail, 'recDiv');
        } else {
          this.noSubs = true;
          // console.log('查無資料');
          // this.goTo('recDiv');
        }
        this.loading = false;
      });
    this.food3choosed = this.food3[this.searchForm.value.food3select];
  }

  riskClick(subs: FoodSubsDetailListI, gotoDiv: string) {
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      this.noRisk = false;
      return;
    }
    this.subsRiskRsp = new SubsRiskRsp();
    const subsRiskReq: SubsRiskReqI = new SubsRiskReq();
    // 點毒化物風險
    subsRiskReq.BodyWeight = this.searchForm.value.weight;
    subsRiskReq.Consume = this.searchForm.value.quant;
    subsRiskReq.Age = this.searchForm.value.age;
    subsRiskReq.Gender = this.searchForm.value.gender;
    subsRiskReq.Foodid = this.searchForm.value.food3select;
    subsRiskReq.Subsid = subs.Subsid;
    this.subsChoosed = subs.SubsName;
    this.httpService.httpPost('/Recommend/Risk', subsRiskReq)
      .subscribe((data: any) => {
        this.subsRiskRsp = data;
        // console.log(data);
        if (this.subsRiskRsp.SubsATDIRfD && this.subsRiskRsp.PersonalRisk !== 0 && this.subsRiskRsp.RegulationRisk) {
          this.noRisk = false;
          this.personalRisk = Utils.fusionChartsGuage(Number(this.subsRiskRsp.PersonalRisk.toFixed(3)),
            Number(this.subsRiskRsp.PersonalRisk.toFixed(3)),
            Number(this.subsRiskRsp.RegulationRisk.toFixed(3)));
          // this.regulationRisk = Utils.fusionChartsGuage(Number(this.subsRiskRsp.RegulationRisk.toFixed(2)));
        } else if (this.subsRiskRsp.SubsATDIRfD && this.subsRiskRsp.PersonalRisk !== 0) {
          this.noRisk = false;
          this.personalRisk = Utils.fusionChartsGuage(Number(this.subsRiskRsp.PersonalRisk.toFixed(3)),
            Number(this.subsRiskRsp.PersonalRisk.toFixed(3)));
        } else {
          this.noRisk = true;
          // console.log('查無資料');
        }
        Utils.goTo(gotoDiv, this.route);
      });
  }

  concClick(strFilter: string) {
    // 點濃度檢測明細
    const id = this.subsTab;
    const title = this.food3choosed + '中的' + (strFilter === '' ? this.subsTab : strFilter) + '-濃度檢測明細';
    this.dialog.open(ConcDialogComponent, Utils.myDialogConfig(id, title,
      this.foodConcList.filter(element => element.SubsName.includes(strFilter))
    ));
  }

  introClick(subs: FoodSubsDetailListI) {
    // 點毒化物介紹
    const id = subs.Subsid;
    const title = subs.SubsName;
    const data = {
      subsIntro: subs.SubsIntro,
      refAgency: '國家環境毒物研究中心',
      subsIntroRef: subs.SubsIntroRef,
    };
    this.dialog.open(IntroDialogComponent, Utils.myDialogConfig(id, title, data));
  }

}
