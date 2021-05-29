export interface RecommendReqI {
  BodyWeight: any;
  Foodid: any;
}

export interface UnitRspI {
  UnitDesc: string;
}

export interface RecommendRspI {
  FoodIntakeCommmend: CommendRspI;
  FoodSubsList: FoodSubsListI[];
  SubsClasses: object;
}

export interface CommendRspI {
  Subsid: string;
  SubsName: string;
  IntakeCommmend: 0;
}

export interface FoodSubsListI {
  FoodConcList: FoodConcListI[];
  FoodSubsDetailList: FoodSubsDetailListI[];
  SubsClassName: string;
}

export interface FoodConcListI {
  ConcDTtime: Date;
  ConcRef: string;
  Concid: string;
  SubsConc: string;
  SubsName: string;
}

export interface FoodSubsDetailListI {
  ConcCount: number;
  ConcDate: string;
  MrlUpdateTime: Date;
  SubsConc: string;
  SubsIntro: string;
  SubsIntroRef: string;
  SubsMrl: string;
  SubsMrlRef: string;
  SubsName: string;
  Subsid: string;
}

export class UnitRsp implements UnitRspI {
  UnitDesc = '';
}

export class FoodSubsDetail implements FoodSubsDetailListI {
  ConcCount: number;
  ConcDate: string;
  MrlUpdateTime: Date;
  SubsConc: string;
  SubsIntro: string;
  SubsIntroRef: string;
  SubsMrl: string;
  SubsMrlRef: string;
  SubsName: string;
  Subsid: string;
}

export class RecommendReq implements RecommendReqI {
  BodyWeight: any;
  Foodid: any;
}

export class RecommendRsp implements RecommendRspI {
  FoodIntakeCommmend: CommendRspI;
  FoodSubsList: FoodSubsListI[];
  SubsClasses: object;
}
