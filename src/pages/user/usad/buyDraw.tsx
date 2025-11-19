import { copyTextToClipboard } from '@/utils';
import { CopyOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Drawer, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

export default function BuyDraw({ currency }: { currency: string }) {
  const { buyDrawer, handlerDepositComplete, setBuyDrawer, preData } =
    useModel('gbpc');
  const [form] = Form.useForm();
  const [bankInfo, setBankInfo] = useState({});
  const { officialList } = useModel('payment');
  const handlerComplete = async () => {
    let values = await form.validateFields();
    handlerDepositComplete({
      ...values,
      transactionId: preData.id,
    });
  };

  useEffect(() => {
    setBankInfo(
      officialList.find(
        (item: any) => item.currency === preData.fiatCurrency,
      ) || {},
    );
  }, [preData, officialList]);

  return (
    <Drawer
      title="Buy USAD with Fiat"
      width={'57%'}
      open={buyDrawer}
      onClose={() => {
        setBuyDrawer(false);
      }}
      maskClosable={false}
      destroyOnHidden={true}
    >
      <div className=" flex gap-[90px] pl-[22px] pr-[105px]">
        <div className="flex-1">
          <div className="text-sm text-white">
            Use your bank account to make a transfer to the bank detailsbelow
          </div>
          <div className="mt-10 p-4 border border-[#505050] rounded-lg">
            <div className="flex leading-8 items-start gap-4 text-sm justify-between">
              <div className="text-[#ADB1B8]">Account Name </div>
              <div className="text-white flex items-center gap-2 justify-end text-right flex-1">
                {bankInfo.accountHolder}
                <CopyOutlined
                  className="cursor-pointer"
                  onClick={() => {
                    copyTextToClipboard(bankInfo.accountHolder);
                  }}
                />
              </div>
            </div>
            <div className="flex leading-8 items-start gap-4 text-sm justify-between">
              <div className="text-[#ADB1B8]">IBAN</div>
              <div className="text-white flex items-center gap-2 justify-end text-right flex-1">
                {bankInfo.iban}
                <CopyOutlined
                  className="cursor-pointer"
                  onClick={() => {
                    copyTextToClipboard(bankInfo.iban);
                  }}
                />
              </div>
            </div>
            <div className="flex leading-8 items-start gap-4 text-sm justify-between">
              <div className="text-[#ADB1B8]">BIC </div>
              <div className="text-white flex items-center gap-2 justify-end text-right flex-1">
                {bankInfo.bic}
                <CopyOutlined
                  className="cursor-pointer"
                  onClick={() => {
                    copyTextToClipboard(bankInfo.bic);
                  }}
                />
              </div>
            </div>
            <div className="flex leading-8 items-start gap-4 text-sm justify-between">
              <div className="text-[#ADB1B8]">Bank Name </div>
              <div className="text-white flex items-center gap-2 justify-end text-right flex-1">
                {bankInfo.bankName}
                <CopyOutlined
                  className="cursor-pointer"
                  onClick={() => {
                    copyTextToClipboard(bankInfo.bankName);
                  }}
                />
              </div>
            </div>
            <div className="flex leading-8 items-start gap-4 text-sm justify-between">
              <div className="text-[#ADB1B8]">Bank Address </div>
              <div className="text-white gap-2 flex items-center justify-end text-right flex-1">
                {bankInfo.address}
                <CopyOutlined
                  className="cursor-pointer"
                  onClick={() => {
                    copyTextToClipboard(bankInfo.address);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex mt-[30px] leading-8 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">Arrive Time </div>
            <div className="gold-gradient-text gap-2 flex items-center justify-end text-right flex-1">
              1-2 business days
            </div>
          </div>
          <div className="flex leading-8 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">Fee </div>
            <div className="gold-gradient-text gap-2 flex items-center justify-end text-right flex-1">
              0.1%
            </div>
          </div>
          <div className="flex leading-8 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">Minimum amount </div>
            <div className="gold-gradient-text gap-2 flex items-center justify-end text-right flex-1">
              100,000 {currency || '£'}
            </div>
          </div>

          <Form form={form}>
            <Form.Item rules={[{ required: true, message: '' }]} name="tradeId">
              <div className="mt-3">
                <Input
                  placeholder="Transaction ID provided by your bank"
                  type="text"
                  className="register-input"
                />
              </div>
            </Form.Item>
          </Form>

          <div className="flex items-center mt-[48px] justify-between">
            <div
              onClick={handlerComplete}
              className="text-white flex-1 text-center cursor-pointer font-bold rounded-lg gold-gradient-bg text-shadow leading-[48px]"
            >
              I've sent the funds
            </div>
          </div>
        </div>
        <div className="w-[285px]">
          <div className="text-[18px] font-bold leading-8 text-white">
            How it works
          </div>
          <div className="relative">
            <div className="w-[1px] bg-[#F0F1F1] absolute top-3 bottom-[-26px] left-[1.5px]"></div>
            <div className="mt-3">
              <div className="font-bold before:content-[''] relative before:absolute before:left-0 before:w-1 before:h-1 before:rounded-full before:bg-white before:top-[50%] before:mt-[-2px]  pl-[18px] text-white text-base">
                Transfer Funds
              </div>
              <div className="mt-2  pl-[18px] text-[#81858C] text-sm leading-[22px]">
                Transfer fiat currency to the USAD reserve account
              </div>
            </div>
            <div className="mt-3">
              <div className="font-bold before:content-[''] relative before:absolute before:left-0 before:w-1 before:h-1 before:rounded-full before:bg-white before:top-[50%] before:mt-[-2px]  pl-[18px] text-white text-base">
                Process Order
              </div>
              <div className="mt-2  pl-[18px] text-[#81858C] text-sm leading-[22px]">
                Wait 1-2 business days to process order
              </div>
            </div>
            <div className="mt-3">
              <div className="font-bold before:content-[''] relative before:absolute before:left-0 before:w-1 before:h-1 before:rounded-full before:bg-white before:top-[50%] before:mt-[-2px]  pl-[18px] text-white text-base">
                Mint USAD
              </div>
              <div className="mt-2  pl-[18px] text-[#81858C] text-sm leading-[22px]">
                Once fiat are received, an equivalent amount of USAD tokens
                (minus fee) will be minted 1:1
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-bold before:content-[''] relative before:absolute before:left-0 before:w-1 before:h-1 before:rounded-full before:bg-white before:top-[50%] before:mt-[-2px]  pl-[18px] text-white text-base">
              USAD Credited
            </div>
            <div className="mt-2  pl-[18px] text-[#81858C] text-sm leading-[22px]">
              Your USAD tokens are immediately credited to your USAD account,
              ready to transfer, hold or withdraw
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
