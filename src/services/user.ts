import { request } from '@umijs/max';

export const get2fa = async () => {
  return request('/user/auth/2fa', {
    method: 'post',
  });
};

export const updateUser = async (data: any) => {
  return request('/user', {
    method: 'put',
    data,
  });
};

export const getSelf = async () => {
  return request('/user/self', {
    method: 'get',
  });
};

export const secondaryLogin = async (data: any) => {
  return request('/user/auth/secondary-login', {
    method: 'post',
    data,
  });
};

export const bind2fa = async (data: any) => {
  return request('/user/auth/2fa/enable', {
    method: 'put',
    data,
  });
};

export const updatePassword = async (data: any) => {
  return request('/user/password', {
    method: 'put',
    data,
  });
};

export const disable2faAxios = async (data: any) => {
  return request('/user/auth/2fa/disable', {
    method: 'put',
    data,
  });
};

export const sendCaptcha = async (data: any) => {
  return request('/user/auth/captcha', {
    method: 'post',
    data,
  });
};

export const resetPassword = async (data: any) => {
  return request('/user/reset-password', {
    method: 'post',
    data,
  });
};

export const updateEmail = async (data: any) => {
  return request('/user/email', {
    method: 'put',
    data,
  });
};

export const checkUser = async (data: { email: string }) => {
  return request('/user/exists', {
    method: 'get',
    params: data,
  });
};

export const upload = async (data: any, config?: any) => {
  return request('/third-party/file-store', {
    method: 'post',
    data,
    ...config,
  });
};

export const realness = async (data: any) => {
  return request('/user/real-name/realness', {
    method: 'post',
    data,
  });
};

export const realnessVerify = async (data: any) => {
  return request('/user/real-name', {
    method: 'post',
    data,
  });
};

export const getVeriSelf = async () => {
  return request('/user/real-name/self', {
    method: 'get',
  });
};

export const getCorporateSelf = async () => {
  return request('/user/business/real-name/self', {
    method: 'get',
  });
};
export const businessRelness = async (data: any) => {
  return request('/user/business/real-name', {
    method: 'post',
    data,
  });
};

export const createUbo = async (data: any) => {
  return request('/user/business/real-name/member', {
    method: 'post',
    data,
  });
};

export const delUbo = async (data: any) => {
  return request(`/user/business/real-name/member/${data.id}`, {
    method: 'delete',
  });
};

export const getUboList = async (data: any) => {
  return request('/user/business/real-name/member', {
    method: 'get',
    params: data,
  });
};
export const getUbo = async (data: any) => {
  return request(`/user/business/real-name/member/${data.id}`, {
    method: 'get',
  });
};

export const getRZM = async (data: any) => {
  return request(`/user/business/real-name/member/realness-code/${data.id}`, {
    method: 'get',
  });
};

export const businessRealness = async (data: any) => {
  return request(`/user/business/real-name/member/realness`, {
    method: 'post',
    data,
  });
};

export const businessSendEmail = async (data: any) => {
  return request(`/user/business/real-name/member/send-email`, {
    method: 'post',
    data,
  });
};

export const businessRealNameRealness = async (data: any) => {
  return request(`/user/business/real-name/realness`, {
    method: 'post',
    data,
  });
};

export const bankList = async (data: any) => {
  return request(`/wallet/payment/bank`, {
    method: 'get',
    data,
  });
};

export const createBank = async (data: any) => {
  return request(`/wallet/payment/bank`, {
    method: 'post',
    data,
  });
};

export const delBank = async (data: any) => {
  return request(`/wallet/payment/bank/${data}`, {
    method: 'delete',
  });
};

export const completeBank = async (data: any) => {
  return request(`/wallet/payment/bank/complete`, {
    method: 'post',
    data,
  });
};

export const officialBank = async () => {
  return request(`/wallet/payment/official-bank`, {
    method: 'get',
  });
};

export const getAddressWhitelist = (data: any) => {
  return request(`/wallet/address-whitelist`, {
    method: 'get',
    params: data,
  });
};

export const CreateAndUpdateAddressWhitelist = (data: any) => {
  return request(`/wallet/address-whitelist`, {
    method: 'post',
    data,
  });
};

export const delAddressWhitelist = ({ id, ...props }: any) => {
  return request(`/wallet/address-whitelist/${id}`, {
    method: 'delete',
    params: {
      ...props,
    },
  });
};

export const batchesAddressWhitelist = (data: any) => {
  return request(`/wallet/address-whitelist/batches`, {
    method: 'post',
    data: {
      ...data,
    },
  });
};

export const settingAddressWhitelist = () => {
  return request(`/wallet/account/setting`, {
    method: 'get',
  });
};

export const settingPostAddressWhitelist = (data: any) => {
  return request(`/wallet/account/setting`, {
    method: 'post',
    data,
  });
};

export const walletAccount = () => {
  return request(`/wallet/account`, {
    method: 'get',
  });
};

export const walletMatch = (params: any) => {
  return request(`/wallet/account/asset/match`, {
    method: 'get',
    params,
  });
};

export const walletTransactionLast = (params: any) => {
  return request(`/wallet/account/transaction/last`, {
    method: 'get',
    params,
  });
};

export const TransferGBPC = (data: any) => {
  return request(`/wallet/account/trade/chain/withdrawal`, {
    method: 'post',
    data,
  });
};

export const withdrawalGBPC = (data: any) => {
  return request(`/wallet/account/trade/fiat/withdrawal`, {
    method: 'post',
    data,
  });
};

export const getExchangeRate = (from: any) => {
  return request(`/wallet/account/trade/exchange-rate/${from}`, {
    method: 'get',
  });
};

export const getOfficialCurrency = () => {
  return request(`/wallet/payment/official-currency`, {
    method: 'get',
  });
};

export const DepositPre = (data: any) => {
  return request(`/wallet/account/trade/fiat/deposit/pre`, {
    method: 'post',
    data,
  });
};

export const DepositComplete = (data: any) => {
  return request(`/wallet/account/trade/fiat/deposit/complete`, {
    method: 'post',
    data,
  });
};
