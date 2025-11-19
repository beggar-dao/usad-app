import { walletMatch, walletTransactionLast } from '@/services/user';
import { copyTextToClipboard, substrAddress } from '@/utils';
import { CopyOutlined } from '@ant-design/icons';
import { ConfigProvider, Form, QRCode, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
const status = {
  success: {
    backgroundColor: '#6ECE821F',
    color: '#6ECE82',
  },
  fail: {
    backgroundColor: '#FF21211F',
    color: '#FF2121',
  },
  pending: {
    backgroundColor: '#FF90191F',
    color: '#FF9019',
  },
};

export default function DepositContent() {
  const [addressObj, setAddressObj] = useState({});
  const [list, setList] = useState<any>([]);
  const intervalRef = useRef<any>(null);

  const getWalletTransactionLast = async (value: any) => {
    let res = await walletTransactionLast({
      chainId: value,
      currency: value,
      tradeType: 1,
      // startTime,
    });
    setList(res?.data?.list || []);
  };

  const getWalletMatch = async (value: string) => {
    const res = await walletMatch({
      chainId: value,
      currency: value,
    });
    setAddressObj(res.data || {});
  };

  const handlerChange = (value: string) => {
    // 清除之前的定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (value) {
      getWalletMatch(value);
      getWalletTransactionLast(value);
      intervalRef.current = setInterval(() => {
        getWalletTransactionLast(value);
      }, 3000);
    }
  };

  useEffect(() => {
    // 组件卸载时清除定时器
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="text-center text-[24px] font-bold text-white mb-8">
        Deposit
      </div>
      <Form layout="vertical" className="register-form-layout" size="large">
        <div className="text-sm mb-1 text-[#ADB1B8] leading-[22px]">Coin</div>
        <div className=" leading-[48px] text-[14px] text-white rounded-lg bg-[#191919] flex items-center px-3">
          <img className="block w-4 mr-2" src="/images/usad.png" />
          USAD
        </div>

        <div className="text-sm mb-1 mt-3 text-[#ADB1B8] leading-[22px]">
          Select Network
        </div>

        <Form.Item label="" name="network">
          <Select
            className="no-border-select"
            placeholder="Please select a chain type"
            allowClear
            onChange={handlerChange}
            style={{ width: '100%', height: '47px' }}
            popupRender={(menu) => <>{menu}</>}
            optionRender={(option) => {
              return (
                <>
                  <div className="flex items-center justify-between">
                    <div>{option.label}</div>
                    <div>≈{option.data.mins}</div>
                  </div>
                  <div className="flex text-[#81858C] items-center justify-between font-normal">
                    <div>{option.data.name}</div>
                    <div>{option.data.count}</div>
                  </div>
                </>
              );
            }}
          >
            <Select.Option
              name="Ethereum(ERC20)"
              count={`6 Confirmation/s`}
              mins={`2 mins`}
              value="60"
            >
              ETH
            </Select.Option>
            <Select.Option
              name="Tron(ERC20)"
              count={`6 Confirmation/s`}
              mins={`1 mins`}
              value="195"
            >
              TRX
            </Select.Option>
            <Select.Option
              name="Solana"
              count={`3 Confirmation/s`}
              mins={`30 sec`}
              value="SOL"
            >
              SOL
            </Select.Option>
            <Select.Option
              name="BSC"
              count={`5 Confirmation/s`}
              mins={`10 sec`}
              value="2510"
            >
              BSC
            </Select.Option>
          </Select>
        </Form.Item>
        {addressObj.address ? (
          <>
            <div className="text-sm mb-1 mt-3 text-white leading-[22px]">
              Deposit Address
            </div>
            <div className="bg-[#1E2023] rounded-lg p-4 border border-[#25282C]">
              <div className="flex gap-3 items-center justify-between">
                <QRCode
                  value={addressObj.address}
                  size={86}
                  bordered={false}
                />
                <div className="flex-1 break-all text-sm">
                  <div className="text-[#666]">Address</div>
                  <div className="font-[500]">{addressObj.address || ''}</div>
                </div>
                <CopyOutlined
                  onClick={() => {
                    copyTextToClipboard(addressObj.address);
                  }}
                  className="cursor-pointer"
                />
              </div>
              {list.length ? (
                <>
                  <div className="!mt-4 text-[#9EA6BC] leading-[26px]">
                    Recent Deposits
                  </div>
                  {list.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <div className="flex mt-2 items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-[22px] h-[22px] bg-[#84da23] rounded-full"></div>
                            {item.amount} {item.chainId == '60' ? 'ETH' : ''}
                            {item.chainId == '195' ? 'TRX' : ''}
                          </div>
                          <div
                            style={{
                              backgroundColor:
                                status['success'].backgroundColor,
                              color: status['success'].color,
                            }}
                            className="px-2 text-xs leading-6 rounded"
                          >
                            Completed
                          </div>
                        </div>
                        <div className="grid mt-2 rounded py-[10px] gap-[6px] bg-[#F9FAFA] px-[15px] grid-cols-2">
                          <div className="text-[#9EA6BC] ">
                            Date
                            <span className="text-black pl-1">
                              {item.timestamp
                                ? dayjs(item.timestamp).format(
                                  'YYYY-MM-DD HH:mm',
                                )
                                : null}
                            </span>
                          </div>
                          <div className="text-[#9EA6BC] ">
                            Network
                            <span className="text-black pl-1">
                              {item.chainId == '60' ? 'Ethereum' : ''}
                              {item.chainId == '195' ? 'TRON' : ''}
                            </span>
                          </div>
                          <div className="text-[#9EA6BC] flex items-center">
                            Address
                            <span className="text-black pl-1">
                              {substrAddress(item.address || '')}
                            </span>
                            <CopyOutlined
                              onClick={() => {
                                copyTextToClipboard(item.address || '');
                              }}
                              className="cursor-pointer ml-1"
                            />
                          </div>
                          <div className="text-[#9EA6BC] ">
                            TxID
                            <span className="text-black pl-1">
                              {item.txId
                                ? substrAddress(item.txId || '')
                                : '-'}
                            </span>
                            {item.txId ? (
                              <CopyOutlined
                                onClick={() => {
                                  copyTextToClipboard(item.txId || '');
                                }}
                                className="cursor-pointer ml-1"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
          </>
        ) : null}
      </Form>
    </>
  );
}
