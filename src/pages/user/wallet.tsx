import No2fa from '@/components/No2fa';
import { walletAccount } from '@/services/user';
import { copyTextToClipboard, getChainIconName } from '@/utils';
import { CopyOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import DepositContent from './usad/deposit_content';
import GradientBorderBox from '@/components/GradientBorderBox';

export default function Wallet() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any>({});
  const { user } = useModel('auth');

  useEffect(() => {
    walletAccount().then((res) => {
      setData(res.data || {});
    });
  }, []);

  return (
    <>
      {user.is2FA ? (
        <>
          <Modal
            onCancel={() => {
              setOpen(false);
            }}
            width={588}
            centered
            maskClosable={false}
            footer={null}
            open={open}
            zIndex={9999}
            destroyOnHidden={true}
          >
            <div className="p-4">
              <DepositContent />
            </div>
          </Modal>
          <div className=" pb-6 text-[24px] font-bold text-white">
            Wallet
          </div>
          <div className="text-xs text-[#ADB1B8]">Total balance</div>
          <div className="flex items-center mt-3">
            <div className="text-[32px] mr-3 font-bold text-white">
              £{' '}
              {!visible
                ? data?.assets?.reduce(
                  (pre, cur) => pre + Number(cur.balance),
                  0,
                ) || 0
                : '*****'}
            </div>
            <div
              onClick={() => {
                setVisible(!visible);
              }}
              className=" cursor-pointer text-[26px]"
            >
              {visible ? <EyeFilled /> : <EyeInvisibleFilled />}
            </div>
          </div>
          {/* <div className=" font-bold text-[#6ECE82] mt-2">+0.00</div> */}

          <div className="text-xs text-[#ADB1B8] mt-[85px]">Your Holdings:</div>
          <div className="grid grid-cols-2 mt-[18px] gap-[16px]">
            {data?.assets?.map((item, index) => {
              return (
                <GradientBorderBox gradientClassName="rounded-2xl">
                  <div
                    key={index}
                    className="px-8 py-9 rounded-2xl relative z-10 bg-[#1A1A1B]"
                  >
                    <div className="flex mb-7">
                      <div className="w-[80px] h-[80px] mr-4 relative">
                        <img
                          src={'/images/usad.png'}
                          className="block w-full h-full"
                        />
                        {(() => {
                          const iconName = getChainIconName(item.chainId);
                          if (!iconName) {
                            return null;
                          }
                          return (
                            <img
                              src={`/images/${iconName}.png`}
                              className="absolute right-0 bottom-0 w-6 h-6"
                            />
                          );
                        })()}
                      </div>
                      <div className="flex-1 overflow-auto">
                        <div className="text-[32px] leading-8 mr-3 font-bold text-white">
                          £ {item.balance || 0}
                        </div>
                        <div className="text-sm text-[#ADB1B8] leading-8">
                          <span className="text-white font-bold">Pound</span>{' '}
                          USAD on {item.chainId == '60' ? 'Ethereum' : ''}
                          {item.chainId == '195' ? 'TRON' : ''} (
                          {item.chainId == '60' ? 'ETH' : ''}
                          {item.chainId == '195' ? 'TRX' : ''})
                        </div>
                        <div className="flex  break-all items-center gap-2 text-sm text-[#8f93a1]">
                          {item.address}
                          <CopyOutlined
                            className="cursor-pointer"
                            onClick={() => {
                              copyTextToClipboard(item.address);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div>
                        <div className="text-[18px] text-white">
                          {item.pendingBalance || '0.00'}
                        </div>
                        <div className="text-sm text-[#ADB1B8] mt-2">
                          Pending Transfers
                        </div>
                      </div>
                      <div>
                        <div className="text-[18px] text-white">
                          {item.freezeBalance || '0.00'}
                        </div>
                        <div className="text-sm text-[#ADB1B8] mt-2">
                          Frozen Tokens
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-[56px] items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          history.push('/user/usad/buy');
                        }}
                        className="gold-gradient-bg flex-1 cursor-pointer rounded-lg leading-10 text-center text-white text-xs font-bold text-shadow"
                      >
                        Buy USAD
                      </div>
                      <div
                        onClick={() => {
                          setOpen(true);
                        }}
                        className="gold-gradient-bg cursor-pointer flex-1 rounded-lg leading-10 text-center text-white text-xs font-bold text-shadow"
                      >
                        Deposit
                      </div>
                      <div
                        onClick={() => {
                          history.push('/user/usad/transfer');
                        }}
                        className="border border-[#25282C] cursor-pointer flex-1 rounded-lg leading-10 text-center text-white text-xs font-bold bg-[#1E2023]"
                      >
                        Transfer
                      </div>
                      <div
                        onClick={() => {
                          history.push('/user/usad/withdraw');
                        }}
                        className="border border-[#25282C] cursor-pointer flex-1 rounded-lg leading-10 text-center text-white text-xs font-bold bg-[#1E2023]"
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                </GradientBorderBox>
              );
            })}
          </div>
        </>
      ) : (
        <No2fa />
      )}
    </>
  );
}
