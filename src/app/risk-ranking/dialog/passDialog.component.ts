import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FoodPassConcListI} from '../../interface/riskRankI';

@Component({
  selector: 'app-home',
  templateUrl: './passDialog.component.html'
})
export class PassDialogComponent implements OnInit {

  title: string;
  foodPassConcList: FoodPassConcListI[];

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.foodPassConcList = data.contents;
  }

  ngOnInit() {
  }

}
