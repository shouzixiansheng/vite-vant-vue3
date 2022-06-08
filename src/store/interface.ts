import TestModuleTypes from './modules/testInterface'
export default interface RootStateTypes {
  address: string;
  xToken: string;
  connectType: number;
  nftColor: number;
  myWallBalance: number;
  hkdRate: number;
  myWallNft: object;
  stockState: object;
  historyPath: Array<string>;
  uuid: string;
  agentId: string;
}
export interface AllStateTypes extends RootStateTypes {
  testModule: TestModuleTypes;
}
