export interface RiskRankReqI {
  SmainId: any;
}

export interface RiskRankRspI {
  FoodPassList: FoodPassListI[];
  ScoreDetailList: ScoreDetailListI[];
}

export interface FoodPassListI {
  FailRate: number;
  FoodConcList: FoodPassConcListI[];
  FoodNameCh: string;
  SubsName: string;
  SubsNameCh: string;
}

export interface FoodPassConcListI {
  ConcRef: string;
  Concid: string;
  DtConc: number;
  DtTime: Date;
  Mrl: number;
  MrlRef: string;
  Pass: string;
}

export interface ScoreDetailListI {
  ScoreA: number;
  ScoreB: number;
  ScoreC: number;
  ScoreD: number;
  SubsName: string;
  SubsNameCh: string;
  Total: number;
}

export class RiskRankReq implements RiskRankReqI {
  SmainId: any;
}

export class RiskRankRsp implements RiskRankRspI {
  FoodPassList: FoodPassListI[];
  ScoreDetailList: ScoreDetailListI[];
}
