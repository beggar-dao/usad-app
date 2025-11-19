import {
  bankList,
  completeBank,
  createBank,
  delBank,
  officialBank,
} from '@/services/user';
import { history, useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

export default function () {
  const [list, setList] = useState([]);
  const [verifyModal, setVerifyModal] = useState(false);
  const { setAlertInfo } = useModel('dialogState');
  const [officialList, setOfficialList] = useState([]);
  const [verifyObj, setVerifyObj] = useState<any>({});

  useEffect(() => {
    officialBank().then((res) => {
      setOfficialList(res?.data?.list || []);
    });
  }, []);

  const handlerBankList = async () => {
    let res = await bankList({
      pageNumber: 1,
      pageSize: 10,
    });
    setList(res.data.list || []);
  };

  const handlerCreateBank = async (data: any) => {
    let res = await createBank({
      ...data,
    });
    setVerifyObj(res.data);
    setVerifyModal(true);
    setAlertInfo({
      show: true,
      message: 'added successfully',
      type: 'success',
    });
    document.getElementById('gbpc-scroll')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    history.push('/user/payment');
  };

  const handlerDeleteBank = async (id: any) => {
    await delBank(id);
    setAlertInfo({
      show: true,
      message: 'deleted successfully',
      type: 'success',
    });
    handlerBankList();
  };

  const handlerCompleteBank = async (data: any) => {
    await completeBank(data);
    setAlertInfo({
      show: true,
      message: 'Successfully',
      type: 'success',
    });
  };

  return {
    verifyObj,
    setVerifyObj,
    list,
    officialList,
    setList,
    verifyModal,
    setVerifyModal,
    handlerCompleteBank,
    handlerBankList,
    handlerCreateBank,
    handlerDeleteBank,
  };
}
