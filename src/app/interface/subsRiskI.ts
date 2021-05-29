export interface SubsRiskReqI {
  BodyWeight: any;
  Consume: any;
  Foodid: any;
  Subsid: any;
  Gender: any;
  Age: any;
}

export interface SubsRiskRspI {
  ConcMean: number;
  ConsumeMean: number;
  IntakeCommmend: number;
  Mrl: number;
  PersonalRisk: number;
  RegulationRisk: number;
  SubsATDIRfD: number;
  SubsATDIRfDRef: string;
}

export class SubsRiskReq implements SubsRiskReqI {
  BodyWeight: any;
  Consume: any;
  Foodid: any;
  Subsid: any;
  Gender: any;
  Age: any;
}

export class SubsRiskRsp implements SubsRiskRspI {
  ConcMean = 0;
  ConsumeMean = 0;
  IntakeCommmend = 0;
  Mrl: number;
  PersonalRisk = 0;
  RegulationRisk = 0;
  SubsATDIRfD: number;
  SubsATDIRfDRef: string;
}
