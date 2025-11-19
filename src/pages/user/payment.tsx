import ConfirmModal from '@/components/ConfirmModal';
import No2fa from '@/components/No2fa';
import NoBank from '@/components/NoBank';
import { DeleteOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button } from 'antd';
import { useEffect } from 'react';
import VerifyBank from './components/verifyBank';
import GradientBorderBox from '@/components/GradientBorderBox';

export default function Payment() {
  const { user } = useModel('auth');
  const {
    list,
    verifyObj,
    setVerifyObj,
    setVerifyModal,
    handlerBankList,
    handlerDeleteBank,
  } = useModel('payment');
  const { setConfirmModal } = useModel('global');
  const colors = {
    0: { color: '#FF2121', bgColor: '#FF21211F' },
    1: { color: '#202B4B', bgColor: '#6FC5821F' },
    2: { color: '#6FC582', bgColor: '#6FC5821F' },
    3: { color: '#FF2121', bgColor: '#FF21211F' },
  };

  useEffect(() => {
    handlerBankList();
  }, []);

  return (
    <>
      <ConfirmModal
        confirm={() => {
          setConfirmModal(false);
          handlerDeleteBank(verifyObj.id);
        }}
      />
      <VerifyBank />
      {user.is2FA ? (
        <>
          <div className="text-[24px] mb-6 font-bold text-white">
            Bank Accounts
          </div>
          {list.length ? (
            <>
              <GradientBorderBox gradientClassName="rounded-lg">
                <div className="relative z-10 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_0.6fr] text-sm black-gradient-bg1 h-[40px] leading-[40px] text-white px-3">
                    <div className="px-[18px]">Bank Name</div>
                    <div className="px-[18px]">Account IBAN</div>
                    <div className="px-[18px]">Status</div>
                    <div className="px-[18px]">Option</div>
                  </div>
                  {list.map((obj: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-[1.5fr_1.5fr_1.5fr_0.6fr] flex items-center  px-3"
                      >
                        <div className="px-[18px] py-[15px]">
                          <p className="text-sm font-semibold text-white">
                            {obj.bankName}
                          </p>
                          <p className="text-sm text-[#81858C] mt-1">
                            {obj.holderName}
                          </p>
                        </div>
                        <div className="px-[18px] text-sm text-[#ADB1B8] py-[15px]">
                          {obj.iban}
                        </div>
                        <div className="px-[18px]">
                          <p
                            style={{
                              color: colors[obj.status].color,
                              backgroundColor: colors[obj.status].bgColor,
                            }}
                            className={`inline-block leading-6 rounded px-2 text-xs`}
                          >
                            {obj.status === 0 ? 'Not Verified' : ''}
                            {obj.status === 1 ? 'Awating for approval' : ''}
                            {obj.status === 2 ? 'Verified' : ''}
                            {obj.status === 3 ? 'Rejected' : ''}
                          </p>
                          {obj.status === 0 ? (
                            <p
                              onClick={() => {
                                setVerifyModal(true);
                                setVerifyObj(obj);
                              }}
                              className="text-[12px ml-5 cursor-pointer inline-block leading-6 text-xs text-white rounded px-4 bg-[#202B4B]"
                            >
                              Verify Now
                            </p>
                          ) : null}
                        </div>
                        <div
                          className="px-[18px] cursor-pointer"
                          onClick={() => {
                            setConfirmModal(true);
                            setVerifyObj(obj);
                          }}
                        >
                          {obj.status !== 1 ? (
                            <DeleteOutlined className="text-white" />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GradientBorderBox>
              <Button
                type="primary"
                disabled={list.length >= 5}
                onClick={() => {
                  history.push('/user/payment/addBank');
                }}
                className={`mt-12 cursor-pointer w-[214px] h-[48px] gold-gradient-bg flex justify-center items-center text-shadow text-center ${list.length >= 5 ? 'text-[#000]' : 'text-white'
                  } rounded-lg`}
              >
                Add Bank Account
              </Button>
              <div className="text-[#ADB1B8] mt-3 text-sm">
                You can only add up to 5 account
              </div>
            </>
          ) : (
            <NoBank />
          )}
        </>
      ) : (
        <No2fa />
      )}
    </>
  );
}
