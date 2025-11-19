import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import { walletMatch } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import WithDrawSuccess from './withDrawSuccess';
import usadCoin from '@/assets/images/usad_coin.png';
import GradientBorderBox from '@/components/GradientBorderBox';

export default function Withdraw() {
  const [form] = Form.useForm();
  const [addressObj, setAddressObj] = useState({});
  const { setLoginModel } = useModel('dialogState');
  const { setWithDrawForm, handlerWithDraw } = useModel('gbpc');
  const { setWithDrawModal, setting, handleSettingAddressWhitelist } =
    useModel('addressWhiteList');
  const [checkedBank, setCheckedBank] = useState({});
  const { list, handlerBankList } = useModel('payment');

  useEffect(() => {
    handleSettingAddressWhitelist();
    handlerBankList();
  }, []);

  const getWalletMatch = async (value: string) => {
    try {
      const res = await walletMatch({
        chainId: value,
        currency: value,
      });
      setAddressObj(res.data || {});
    } catch (error) {
      console.log(error);
      setAddressObj({});
    }
  };

  const handlerChange = (value: string) => {
    if (value === '60') {
      form.setFieldValue(
        'burnAddress',
        '0xB72250c7f4F5d9037F431f654CE15F01A2f5a8CC',
      );
    }
    if (value === '195') {
      form.setFieldValue('burnAddress', 'TSNM5FHwcoDqPm6smSa9y6zUf1C9E4Qfdi');
    }
    if (value === 'SOL') {
      form.setFieldValue(
        'burnAddress',
        '8rXrkdyQvgkbvzLZfASsnnGZcnhjbea7zJb5R82Xikc9',
      );
    }
    if (value === '2510') {
      form.setFieldValue(
        'burnAddress',
        '0xB72250c7f4F5d9037F431f654CE15F01A2f5a8CC',
      );
    }
    if (value) {
      getWalletMatch(value);
    }
  };

  const handlerLimit = async () => {
    history.push('/user/addressWhitelist');
    setWithDrawModal(true);
  };

  const handleSubmit = async () => {
    let values = await form.validateFields();
    if (setting.isSecondaryAuthOfFiatWithdrawal === 0) {
      handlerWithDraw({
        assetId: addressObj.id,
        bankInfo: list.find((obj) => obj.id === values.bankId),
        ...values,
        checked: 1,
      });
      return;
    }
    setLoginModel(true);
    setWithDrawForm({
      valid: true,
      assetId: addressObj.id,
      bankInfo: list.find((obj) => obj.id === values.bankId),
      ...values,
    });
  };

  return (
    <>
      <WithDrawSuccess />
      <div className="flex items-center justify-between pb-3 text-[24px] font-bold">
        <div className="text-sm cursor-pointer leading-[26px] text-white flex items-center gap-6">
          <span
            onClick={() => {
              history.push('/user/usad/buy');
            }}
          >
            Buy USAD
          </span>
          <span
            onClick={() => {
              history.push('/user/usad/transfer');
            }}
          >
            Transfer
          </span>
          <span
            onClick={() => {
              history.push('/user/usad/deposit');
            }}
          >
            Deposit USAD
          </span>
          <span className="gold-gradient-text border-b border-b-[#C69F58]">
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

      <div className="flex mt-9 gap-[50px]">
        <div className="flex-1">
          <Form layout="vertical" size="large" form={form} requiredMark={false}>
            <div className="text-sm mb-1 text-[#ADB1B8] leading-[22px]">
              Coin
            </div>
            <div className="leading-[48px] text-[14px] text-[#FFF0F0] rounded-lg bg-[#1E2023] flex items-center px-3">
              <img className="block w-4 mr-2" src={usadCoin} />
              USAD
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
              name="network"
              label="Select Network"
              className="mt-6"
            >
              <Select
                allowClear
                placeholder="Please select a chain type"
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
            <div className="text-sm flex justify-between mb-1 text-[#ADB1B8] leading-[22px]">
              <div>Burn Address</div>
            </div>
            <Form.Item
              name={'burnAddress'}
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
            >
              <Input placeholder="gbpc burn wallet default address" disabled />
            </Form.Item>
            <div className="text-sm flex justify-between mb-1 text-[#ADB1B8] leading-[22px]">
              <div>Amount</div>
              <div className="text-[14px] text-[#ADB1B8]">
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
                  message: 'Please enter a valid number!',
                },
                {
                  validator: (_, value) => {
                    if (value && parseFloat(value) < 100000) {
                      return Promise.reject('Minimum amount is 100,000 USAD');
                    }
                    return Promise.resolve();
                  },
                },
                {
                  validator: (_, value) => {
                    if (value && parseFloat(value) > addressObj.balance) {
                      return Promise.reject(
                        `Maximum amount is ${addressObj.balance} USAD`,
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
                      form.setFieldsValue({ amount: addressObj.balance });
                    }}
                    className="text-[#ADB1B8] cursor-pointer"
                  >
                    All
                  </span>
                }
              />
            </Form.Item>

            <div className="text-sm mt-1 mb-1 flex items-center justify-between text-[#ADB1B8] leading-[22px]">
              <div>Receiver</div>
              <div
                onClick={() => {
                  history.push('/user/payment/addBank');
                }}
                className="text-[#ADB1B8] cursor-pointer"
              >
                Add Bank
              </div>
            </div>
            <Form.Item
              rules={[{ required: true, message: '' }]}
              name={'bankId'}
              label=""
            >
              <Select
                className="!h-[auto] min-h-[47px]"
                onChange={(id) => {
                  setCheckedBank(list.find((obj) => obj.id === id));
                }}
                labelRender={() => (
                  <div className="!p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-[48px] h-[48px] rounded bg-blue-500"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold leading-[26px] text-white">
                            {checkedBank.bankName}
                          </div>
                          <div className="text-sm text-[#ADB1B8]">
                            {checkedBank.iban}
                          </div>
                        </div>
                        <div className="text-sm text-[#ADB1B8]">
                          {checkedBank.holderName}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                options={list
                  .filter((obj) => obj.status === 2)
                  .map((item) => {
                    return {
                      label: (
                        <div className="flex items-center gap-2">
                          <div className="w-[48px] h-[48px] rounded bg-blue-500"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-bold leading-[26px] text-white">
                                {item.bankName}
                              </div>
                              <div className="text-sm text-[#ADB1B8]">
                                {item.iban}
                              </div>
                            </div>
                            <div className="text-sm text-[#ADB1B8]">
                              {item.holderName}
                            </div>
                          </div>
                        </div>
                      ),
                      value: item.id,
                    };
                  })}
              ></Select>
            </Form.Item>
            <div className="text-sm text-[#ADB1B8] mt-8">Transaction Fee</div>
            <div className="font-bold text-base">0.1%</div>
            <div
              onClick={handleSubmit}
              className="mt-6 max-w-[212px] font-bold cursor-pointer leading-[48px] w-full rounded-lg gold-gradient-bg text-white text-center text-shadow"
            >
              Confirm
            </div>
          </Form>
        </div>
        <GradientBorderBox className="w-[424px]" gradientClassName="rounded-lg">
          <div className="h-full black-gradient-bg2 p-8 relative z-10 rounded-lg">
            <div className="text-sm text-[#ADB1B8] leading-[26px]">
              Daily Remaining Limit
            </div>
            <div className="mt-1 text-white font-bold">
              {setting.usedFiatWithdrawalDailyLimit || 0} /
              {setting.fiatWithdrawalDailyLimit} USAD
            </div>

            <div className="mt-4 text-sm text-[#ADB1B8] leading-[26px]">
              Monthly Remaining Limit
            </div>
            <div className="mt-1 text-white font-bold">
              {setting.usedFiatWithdrawalMonthlyLimit || 0} /
              {setting.fiatWithdrawalMonthlyLimit} USAD
            </div>
            <div
              onClick={handlerLimit}
              className="mt-[50px] cursor-pointer text-sm leading-[26px] gold-gradient-text"
            >
              Increase Limit Manage Limit
            </div>
            <div className="text-sm text-white mt-[10px]">
              · The minimum withdrawal amount is: 100,000 USAD
            </div>
          </div>
        </GradientBorderBox>
      </div>
    </>
  );
}
