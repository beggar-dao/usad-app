import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import { walletMatch } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import usadCoin from '@/assets/images/usad_coin.png';
import TransferSuccess from './transferSuccess';
import GradientBorderBox from '@/components/GradientBorderBox';

const chainType = {
  60: 'ETH',
  195: 'TRX',
  SOL: 'SOL',
  2510: 'BSC',
};

export default function Buy() {
  const [form] = Form.useForm();
  const [addressObj, setAddressObj] = useState({});
  const { setAddressModal, getAddress, addressList, getAddressByAddress } =
    useModel('addressWhiteList');
  const { setLoginModel } = useModel('dialogState');
  const { setTransferForm, handlerTransfer } = useModel('gbpc');

  const handleSubmit = async () => {
    let values = await form.validateFields();

    const addressInfo = getAddressByAddress(values.toAddress);
    const params = {
      valid: true,
      ...values,
      assetId: addressObj.id,
    };

    if (addressInfo?.isSecondaryAuth) {
      setLoginModel(true);
      setTransferForm(params);
    } else {
      handlerTransfer({ ...params, checked: true });
    }
  };

  const getWalletMatch = async (value: string) => {
    const res = await walletMatch({
      chainId: value,
      currency: value,
    });
    setAddressObj(res.data || {});
  };

  const handlerChange = (value: string) => {
    getWalletMatch(value);
  };

  useEffect(() => {
    getAddress();
  }, []);

  const network = Form.useWatch('network', form);

  return (
    <>
      <TransferSuccess />
      <div className="flex items-center justify-between pb-3 text-[24px] font-bold">
        <div className="text-sm cursor-pointer leading-[26px] text-white flex items-center gap-6">
          <span
            onClick={() => {
              history.push('/user/usad/buy');
            }}
          >
            Buy USAD
          </span>
          <span className="gold-gradient-text border-b border-b-[#C69F58]">
            Transfer
          </span>
          <span
            onClick={() => {
              history.push('/user/usad/deposit');
            }}
          >
            Deposit USAD
          </span>
          <span
            onClick={() => {
              history.push('/user/usad/withdraw');
            }}
          >
            Fiat withdraw
          </span>
        </div>
        <CloseSvg
          className="cursor-pointer"
          onClick={() => {
            history.push('/user/usad');
          }}
        />
      </div>
      <GradientBorderBox className="w-[580px] !mt-[96px] m-auto" gradientClassName="rounded-2xl">
        <div className="p-8 rounded-2xl relative z-10 black-gradient-bg2">
          <div className="text-center text-[24px] font-bold text-white mb-8">
            Transfer
          </div>
          <Form form={form} layout="vertical" size="large" requiredMark={false}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
              label="Select Network"
              name="network"
            >
              <Select
                placeholder="Please select a chain type"
                allowClear
                onChange={handlerChange}
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

            <div className="text-sm mb-1 text-[#ADB1B8] leading-[22px]">
              Coin
            </div>
            <div className="mb-2 leading-[48px] text-[14px] text-[#FFF0F0] rounded-lg bg-[#1E2023] flex items-center px-3">
              <img className="block w-4 mr-2" src={usadCoin} />
              USAD
            </div>

            <div className="text-sm mb-1 mt-2 flex items-center justify-between text-[#ADB1B8] leading-[22px]">
              <div>To</div>
              <div
                onClick={() => {
                  history.push('/user/addressWhitelist');
                  setAddressModal(true);
                }}
                className="text-[#ADB1B8] cursor-pointer"
              >
                Add an Address
              </div>
            </div>
            <Form.Item
              label=""
              name="toAddress"
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
            >
              <Select
                showSearch
                disabled={!network}
                placeholder="Enter the destination wallet address"
              >
                {addressList
                  .filter(
                    (item) =>
                      item.status === 1 &&
                      item.chainType === chainType[network],
                  )
                  .map((item, index) => {
                    return (
                      <Select.Option key={index} value={item.address}>
                        {item.address}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>

            <div className="text-sm flex justify-between mb-1 mt-2 text-[#5B6276] leading-[22px]">
              <div>Amount</div>
              <div className="text-[14px] text-[#5B6276]">
                Transferable Amount：
                <span className="font-bold">
                  {addressObj.balance || 0} USAD
                </span>
              </div>
            </div>

            <Form.Item
              name={'amount'}
              rules={[
                {
                  required: true,
                  message: '',
                },
                {
                  pattern: /^\d+(\.\d+)?$/,
                  message: '',
                },
                {
                  validator: (_, value) => {
                    if (
                      value &&
                      parseFloat(value) > parseFloat(addressObj.balance || 0)
                    ) {
                      return Promise.reject(
                        'Amount exceeds transferable balance',
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                onKeyDown={(e) => {
                  // 只允许数字、小数点、退格、删除、Tab、Escape、Enter键
                  if (
                    !/[0-9.]/.test(e.key) &&
                    ![
                      'Backspace',
                      'Delete',
                      'Tab',
                      'Escape',
                      'Enter',
                      'ArrowLeft',
                      'ArrowRight',
                    ].includes(e.key)
                  ) {
                    // 阻止非数字字符的输入
                    e.preventDefault();
                  }

                  // 确保小数点只能输入一次
                  if (e.key === '.' && e.currentTarget.value.includes('.')) {
                    e.preventDefault();
                  }
                }}
                suffix={
                  <span
                    onClick={() => {
                      form.setFieldsValue({ amount: addressObj.balance || 0 });
                    }}
                    className="text-[#ADB1B8] cursor-pointer"
                  >
                    All
                  </span>
                }
              />
            </Form.Item>
          </Form>
          <div
            onClick={handleSubmit}
            className="mt-[80px] font-bold cursor-pointer leading-[48px] w-full rounded-lg gold-gradient-bg text-white text-center text-shadow"
          >
            Confirm
          </div>
        </div>
      </GradientBorderBox>
    </>
  );
}
