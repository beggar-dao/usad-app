import { request } from '@umijs/max';

export interface TransactionsParams {
  /**
   * 链 ID
   */
  chainId?: string;
  /**
   * 币种
   */
  coin?: string;
  /**
   * 结束时间
   */
  endTime?: number;
  /**
   * 当前页面索引
   */
  pageNumber?: number;
  /**
   * 页面数目大小
   */
  pageSize?: number;
  /**
   * 开始时间
   */
  startTime?: number;
  /**
   * 状态（0：待审核，1：审核成功，2：审核驳回，3：交易成功，4：交易失败））
   */
  status?: number;
  /**
   * 交易类型（1：链上入金 Deposit，2：链上出金 Transfer，3：法币入金 Buy，4：法币出金 Fiat Withdrawal）
   */
  tradeType?: number;
}

/**
 * 钱包账户交易记录
 *
 * WalletAccountTransactionItem
 */
export interface WalletAccountTransactionItem {
  /**
   * 钱包账户 ID
   */
  accountId?: string;
  /**
   * 钱包地址
   */
  address?: string;
  /**
   * 交易金额
   */
  amount?: string;
  /**
   * 交易价格
   */
  price?: string;
  /**
   * 交易数量
   */
  qty?: string;
  /**
   * 钱包资产 ID
   */
  assetId?: string;
  /**
   * 银行 ID
   */
  bankId?: string;
  /**
   * 区块高度
   */
  blockHigh?: number;
  /**
   * 链 ID
   */
  chainId?: string;
  /**
   * 链名称
   */
  chainName?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 币种类型
   */
  currency?: string;
  /**
   * 币种名称
   */
  currencyName?: string;
  /**
   * 币种精度
   */
  decimals?: number;
  /**
   * 手续费
   */
  fee?: string;
  /**
   * 法币金额
   */
  fiatAmount?: string;
  /**
   * 法币币种
   */
  fiatCurrency?: string;
  /**
   * 主键 ID
   */
  id: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态（0：待审核，1：审核成功，2：审核驳回，3：交易成功，4：交易失败）
   */
  status?: number;
  /**
   * 第三方状态（0：待审核，1：审核成功，2：审核驳回，3：交易成功，4：交易失败）
   */
  thirdPartyStatus?: number;
  /**
   * 交易时间
   */
  timestamp?: number;
  /**
   * 转账目标地址
   */
  toAddress?: string;
  /**
   * 外部业务流水号
   */
  tradeId?: string;
  /**
   * 交易类型（1：法币入金，2：法币出金，3：转账，4：提款）
   */
  tradeType?: number;
  /**
   * 区块链交易 hash
   */
  txId?: string;
  /**
   * 区块链交易链接
   */
  txUrl?: string;
  /**
   * 更新时间
   */
  updateTime?: number;
  /**
   * 用户 ID
   */
  userId?: string;
  /**
   * 兑换汇率
   */
  exchangeRate?: string;
  /**
   *
   */
  method?: string;
}

/**
 * 返回数据体
 *
 * WalletAccountTransactionResponse
 */
export interface WalletAccountTransactionResponse {
  list: WalletAccountTransactionItem[];
  _meta: {
    currentPage: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
  };
}

export const getTransaction = (params: TransactionsParams) => {
  return request<WalletAccountTransactionResponse>(
    '/wallet/account/transaction',
    {
      method: 'get',
      params,
    },
  );
};
