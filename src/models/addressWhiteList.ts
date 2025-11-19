import {
  batchesAddressWhitelist,
  CreateAndUpdateAddressWhitelist,
  delAddressWhitelist,
  getAddressWhitelist,
  settingAddressWhitelist,
  settingPostAddressWhitelist,
  walletAccount,
} from '@/services/user';
import { useModel } from '@umijs/max';
import { useState } from 'react';

let query = {};

export default function () {
  const [addressModal, setAddressModal] = useState(false);
  const [withDrawModal, setWithDrawModal] = useState(false);
  const [addressBatchModal, setAddressBatchModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [addressObj, setAddressObj] = useState({});
  const { setAlertInfo, setLoginModel } = useModel('dialogState');
  const { setConfirmModal } = useModel('global');
  const [setting, setSetting] = useState({});
  const [page, setPage] = useState({});

  const handleSettingAddressWhitelist = async () => {
    await walletAccount();
    const res = await settingAddressWhitelist();
    setSetting(res.data || {});
  };

  const handleSettingAddressWhitelistPost = async (data: any) => {
    await settingPostAddressWhitelist({
      ...data,
      id: setting.id,
    });
    setLoginModel(false);
    setAddressObj({});
    setAlertInfo({
      type: 'success',
      message: `Setting successful!`,
      show: true,
    });
    handleSettingAddressWhitelist();
  };

  const getAddress = async (params: any = {}) => {
    query = {
      pageNumber: 1,
      pageSize: 5,
      ...query,
      ...params,
    };
    const res = await getAddressWhitelist({
      ...query,
    });
    setAddressList(res?.data?.list || []);
    setPage(res?.data?._meta || {});
  };

  const batchAddress = async (data: any) => {
    await batchesAddressWhitelist({
      ...addressObj,
      ...data,
    });
    setLoginModel(false);
    setAddressBatchModal(false);
    setAddressObj({});
    setAlertInfo({
      type: 'success',
      message: `Batch add successful!`,
      show: true,
    });
    getAddress();
  };

  const updateAddress = async (data: any) => {
    let res = await CreateAndUpdateAddressWhitelist({
      ...addressObj,
      ...data,
    });
    setLoginModel(false);
    setAddressModal(false);
    setAddressObj({});
    setAlertInfo({
      type: 'success',
      message: `${addressObj.id ? 'Update' : 'Create'} successful!`,
      show: true,
    });
    getAddress();
  };

  const handlerDeleteWallet = async (data: any) => {
    await delAddressWhitelist(data);
    setAddressObj({});
    setConfirmModal(false);
    setLoginModel(false);
    setAlertInfo({
      type: 'success',
      message: `Delete successful!`,
      show: true,
    });
    getAddress();
  };

  const getAddressByAddress = (address: string) => {
    return addressList.find((item: any) => item.address === address);
  };

  return {
    page,
    setting,
    addressObj,
    batchAddress,
    setAddressObj,
    updateAddress,
    addressList,
    getAddress,
    addressModal,
    setAddressModal,
    handlerDeleteWallet,
    withDrawModal,
    setWithDrawModal,
    addressBatchModal,
    setAddressBatchModal,
    getAddressByAddress,
    handleSettingAddressWhitelist,
    handleSettingAddressWhitelistPost,
  };
}
