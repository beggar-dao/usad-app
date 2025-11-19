import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import usadCoin from '@/assets/images/usad_coin.png';
import { history, useModel } from '@umijs/max';
import { ConfigProvider, Form, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import BuyDraw from './buyDraw';
import BuySuccess from './buySuccess';
import GradientBorderBox from '@/components/GradientBorderBox';

export default function Buy() {
  const [form] = Form.useForm();
  const [checkedBank, setCheckedBank] = useState({});
  const { list, handlerBankList } = useModel('payment');

  const {
    handlerGetOfficialCurrency,
    currencyList,
    handlerGetExchangeRate,
    rate,
    handlerDepositPre,
  } = useModel('gbpc');

  const handlerSubmit = async () => {
    let values = await form.validateFields();
    await handlerDepositPre({
      ...values,
      currency: 195,
      chainId: 195,
    });
  };

  const faitCurrency = Form.useWatch('faitCurrency', form);

  useEffect(() => {
    setCheckedBank({});
  }, [faitCurrency]);

  useEffect(() => {
    handlerGetOfficialCurrency();
    handlerBankList();
  }, []);

  const currency = {
    GBP: '£',
    EUR: '€',
    USD: '$',
    AED: 'د.إ',
  };

  return (
    <>
      <BuyDraw currency={currency[faitCurrency]} />
      <BuySuccess />
      <div className="flex items-center justify-between pb-3 text-[24px] font-bold text-[#202B4B]">
        <div className="text-sm cursor-pointer leading-[26px] text-white flex items-center gap-6">
          <span className="gold-gradient-text border-b border-b-[#C69F58]">
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
            Buy with Fiat
          </div>
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorBgContainer: '#191919',
                },
              },
            }}
          >
            <Form layout="vertical" size="large" form={form}>
              <div className="rounded-lg px-4 !pt-5  bg-[#191919]">
                <div className="mb-2 text-[14px] text-white font-bold">Spend</div>
                <div className="flex items-center justify-between">
                  <Form.Item
                    name={'faitAmount'}
                    label=""
                    rules={[{ required: true, message: 'Please input amount' }]}
                  >
                    <InputNumber
                      controls={false}
                      placeholder="0.000"
                      min={100000}
                      className="flex-1 relative left-[-10px] bg-transparent text-[28px] min-w-[200px] focus:shadow-none focus:border-0 focus:outline-0 border-0 text-[#9EA6BC] font-bold !px-0"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: '' }]}
                    name={'faitCurrency'}
                    label=""
                  >
                    <Select
                      variant="borderless"
                      className="relative right-[-10px]"
                      placeholder="Select currency"
                      onChange={(value) => {
                        handlerGetExchangeRate(value);
                      }}
                    >
                      {currencyList.map((item) => {
                        return (
                          <Select.Option
                            label={item?.name}
                            key={item?.name}
                            value={item?.name}
                          >
                            {item?.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="mt-3 rounded-lg px-4 !py-5 bg-[#191919]">
                <div className="mb-2 text-[14px] text-white font-bold">
                  Receive
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-[28px] font-bold">
                    {(
                      (rate || 0) * (form.getFieldValue('faitAmount') || 0)
                    ).toFixed(2)}
                  </div>
                  <div className="flex items-center text-[14px] text-white">
                    <img className="block w-4 mr-2" src={usadCoin} />
                    USAD
                  </div>
                </div>
              </div>
              <div className="text-sm mt-6 mb-1 flex items-center justify-between text-white leading-[22px]">
                <div>Payment</div>
                <div
                  onClick={() => {
                    history.push('/user/payment/addBank');
                  }}
                  className="text-[#A9B5D0] cursor-pointer"
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
                  disabled={!faitCurrency}
                  onChange={(id) => {
                    setCheckedBank(list.find((obj) => obj.id === id));
                  }}
                  labelRender={() => (
                    <>
                      {checkedBank.iban ? (
                        <div className="!p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-[48px] h-[48px] rounded bg-blue-500"></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-bold leading-[26px] text-white">
                                  {checkedBank.bankName}
                                </div>
                                <div className="text-sm text-[#A9B5D0]">
                                  {checkedBank.iban}
                                </div>
                              </div>
                              <div className="text-sm text-[#A9B5D0]">
                                {checkedBank.holderName}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}
                  options={list
                    .filter(
                      (obj) => obj.status === 2 && obj.currency === faitCurrency,
                    )
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
                                <div className="text-sm text-[#A9B5D0]">
                                  {item.iban}
                                </div>
                              </div>
                              <div className="text-sm text-[#A9B5D0]">
                                {item.holderName}
                              </div>
                            </div>
                          </div>
                        ),
                        value: item.id,
                      };
                    })}
                />
              </Form.Item>

              <div
                onClick={handlerSubmit}
                className="mt-[80px] font-bold cursor-pointer leading-[48px] w-full rounded-lg gold-gradient-bg text-white text-center text-shadow"
              >
                Buy USAD
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </GradientBorderBox>
    </>
  );
}
