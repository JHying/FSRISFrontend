import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FoodConcListI} from '../../interface/foodRecI';

@Component({
  selector: 'app-home',
  templateUrl: './concDialog.component.html'
})
export class ConcDialogComponent implements OnInit {

  title: string;
  concList: FoodConcListI[];

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.concList = data.contents;
  }

  ngOnInit() {
  }

}
