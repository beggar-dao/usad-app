export enum Status { // 状态（0：待审核，1：审核成功，2：审核驳回，3：交易成功，4：交易失败））
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Success = 3,
  Failed = 4,
}

export enum TradeType { // 交易类型（1：链上入金 Deposit，2：链上出金 Transfer，3：法币入金 Buy，4：法币出金 Fiat Withdrawal）
  Deposit = 1,
  Transfer = 2,
  Buy = 3,
  FiatWithdrawal = 4,
}

export enum CurrencyType { // 币种类型（GBPC，Fiat）
  USAD = 'USAD',
  Fiat = 'Fiat',
}

export const StatusOptions = [
  { label: 'All', value: '' },
  { label: 'Pending', value: Status.Pending },
  { label: 'Approved', value: Status.Approved },
  { label: 'Rejected', value: Status.Rejected },
  { label: 'Successful', value: Status.Success },
  { label: 'Failed', value: Status.Failed },
];

export const TradeTypeOptions = [
  { label: 'All', value: '' },
  { label: 'Deposit', value: TradeType.Deposit },
  { label: 'Transfer', value: TradeType.Transfer },
  { label: 'Buy', value: TradeType.Buy },
  { label: 'Fiat Withdrawal', value: TradeType.FiatWithdrawal },
];

export const CurrencyTypeOptions = [
  { label: 'All', value: '' },
  { label: 'USAD', value: CurrencyType.USAD },
  { label: 'Fiat', value: CurrencyType.Fiat },
];
