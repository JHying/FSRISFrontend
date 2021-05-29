import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RiskRankingComponent} from './risk-ranking.component';
import {describe, expect} from 'jasmine';

describe('RiskRankingComponent', () => {
  let component: RiskRankingComponent;
  let fixture: ComponentFixture<RiskRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RiskRankingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
