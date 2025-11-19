import {
  DepositComplete,
  DepositPre,
  getExchangeRate,
  getOfficialCurrency,
  TransferGBPC,
  withdrawalGBPC,
} from '@/services/user';
import { useModel } from '@umijs/max';
import { useState } from 'react';

export default function () {
  const [buyDrawer, setBuyDrawer] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const [transferForm, setTransferForm] = useState({});
  const [rate, setRate] = useState(0);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const { setLoginModel, setAlertInfo } = useModel('dialogState');
  const [preData, setPreData] = useState<any>({});
  const [withDrawForm, setWithDrawForm] = useState({});
  const [withDrawSuccess, setWithDrawSuccess] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const { handleSettingAddressWhitelist } = useModel('addressWhiteList');

  const handlerGetOfficialCurrency = async () => {
    let res = await getOfficialCurrency();
    setCurrencyList(res?.data?.list || []);
  };

  const handlerDepositComplete = async (values: any) => {
    await DepositComplete(values);
    setBuyDrawer(false);
    setBuySuccess(true);
  };

  const handlerDepositPre = async (values: any) => {
    let res = await DepositPre(values);
    setPreData(res.data || {});
    setBuyDrawer(true);
  };

  const handlerGetExchangeRate = async (name: string) => {
    const res = await getExchangeRate(name);
    setRate(res.data);
  };

  const handlerTransfer = async (values: any) => {
    await TransferGBPC({
      ...transferForm,
      ...values,
      nextIsSecondaryAuth: values.checked ? 0 : 1,
    });
    handleSettingAddressWhitelist();
    setAlertInfo({
      show: true,
      message: 'Transfer successfully',
      type: 'success',
    });
    setTransferSuccess(true);
    setLoginModel(false);
    setTransferForm({});
  };

  const handlerWithDraw = async (values: any) => {
    await withdrawalGBPC({
      ...values,
      ...withDrawForm,
      nextIsSecondaryAuth: values.checked ? 0 : 1,
    });
    handleSettingAddressWhitelist();

    setAlertInfo({
      show: true,
      message: 'Withdrawal successfully',
      type: 'success',
    });
    setWithDrawSuccess(true);
    setLoginModel(false);
    setWithDrawForm({});
  };

  return {
    buyDrawer,
    setBuyDrawer,
    buySuccess,
    setBuySuccess,
    transferForm,
    setTransferForm,
    handlerTransfer,
    transferSuccess,
    setTransferSuccess,
    withDrawForm,
    setWithDrawForm,
    withDrawSuccess,
    setWithDrawSuccess,
    handlerWithDraw,
    handlerGetExchangeRate,
    rate,
    setRate,
    handlerDepositPre,
    preData,
    handlerDepositComplete,
    handlerGetOfficialCurrency,
    currencyList,
  };
}
