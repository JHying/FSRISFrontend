import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './introDialog.component.html'
})
export class IntroDialogComponent implements OnInit {

  title: string;
  introData: {
    subsIntro: string,
    subsIntroRef: string,
  };

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.introData = data.contents;
  }

  ngOnInit() {
  }

}
