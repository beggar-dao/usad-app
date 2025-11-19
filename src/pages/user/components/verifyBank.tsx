import clock from '@/assets/images/clock.png';
import verify from '@/assets/images/verify.png';
import { CheckedIcon, DownArrowIcon, TimeIcon } from '@/components/Icons';
import { history, useLocation, useModel } from '@umijs/max';
import { Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

export default function VerifyBank() {
  const {
    verifyModal,
    verifyObj,
    list,
    setVerifyModal,
    handlerCompleteBank,
    handlerBankList,
    officialList,
  } = useModel('payment');
  const [status, setStatus] = useState('first');
  const [form] = Form.useForm();
  const location = useLocation();
  const { setAlertInfo } = useModel('dialogState');

  const handlerComplete = async () => {
    let res = await form.validateFields();
    await handlerCompleteBank({
      id: verifyObj.id,
      ...res,
    });
    setStatus('end');
  };

  useEffect(() => {
    handlerBankList();
  }, [verifyModal, status]);

  const bankInfo: any =
    officialList.find((item: any) => item.currency === verifyObj.currency) ||
    {};

  const handlerCancel = () => {
    if (location.pathname !== '/user/payment') {
      history.push('/user/payment');
    }
    setStatus('first');
    setVerifyModal(false);
  };

  return (
    <Modal
      onCancel={handlerCancel}
      width={488}
      centered
      maskClosable={false}
      footer={null}
      open={verifyModal}
    >
      {status === 'first' ? (
        <div className="px-4 !py-5">
          <img src={verify} className="m-auto mt-[30px] block w-[200px]" />
          <div className="text-center text-[24px] mb-[20px] mt-[50px] text-white leading-[32px]">
            Deposit to verify account
          </div>
          <div className="text-[#ADB1B8] flex items-center gap-[10px] text-[14px] leading-[32px]">
            Make a deposit with your bank account.
          </div>
          <div className="text-[#ADB1B8] flex items-center gap-[10px] text-[14px] leading-[32px]">
            <DownArrowIcon />
            Make a deposit with your bank account.
          </div>
          <div className="text-[#ADB1B8] flex items-center gap-[10px] text-[14px] leading-[32px]">
            <TimeIcon isActive />
            Allow 1-2 business days for processing
          </div>
          <div className="text-[#ADB1B8] flex items-center gap-[10px] text-[14px] leading-[32px]">
            <CheckedIcon />
            Your account will be verified and ready to use.
          </div>
          <div className="flex items-center mt-[48px] justify-between">
            <div
              onClick={() => {
                setStatus('second');
              }}
              className="text-white flex-1 text-center cursor-pointer font-bold rounded-lg gold-gradient-bg leading-[48px] text-shadow"
            >
              Continue
            </div>
            <div
              onClick={handlerCancel}
              className="border flex-1 ml-6 text-center cursor-pointer text-[#C69F58] font-bold border-[#4F4F4F] rounded-lg leading-[48px]"
            >
              Cancel
            </div>
          </div>
        </div>
      ) : null}
      {status === 'second' ? (
        <div className="px-4 !py-5">
          <div className="text-[24px] font-bold leading-8 text-center text-white">
            Deposit to verify account
          </div>
          <div className="mt-6 text-white text-center text-sm font-medium">
            Deposit Amount
          </div>
          <div className="flex items-end justify-center">
            <div className="text-sm  text-[#ADB1B8]">Min</div>
            <div className="text-[32px] relative top-[8px] font-bold mx-1 text-[#C69F58]">
              2.00
            </div>
            <div className="text-sm text-[#ADB1B8]">
              {bankInfo.currency || ''}
            </div>
          </div>
          <div className="mt-8 border !border-[#FFA6001F] text-[#ee6700] text-sm rounded-lg bg-[#FFA60014] py-[12px] px-[16px] leading-[22px]">
            Add a SWIFT-compatible bank account in your own name (use full
            name). Avoid using: Wise, Lydia, Spendesk, Blank and Kard
          </div>
          <div className="flex mt-3 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">Account Name </div>
            <div className="text-white">
              {`${bankInfo.accountHolder || ''}`}{' '}
            </div>
          </div>
          <div className="flex mt-3 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">IBAN</div>
            <div className="text-white">{bankInfo.iban || ''} </div>
          </div>
          <div className="flex mt-3 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">BIC </div>
            <div className="text-white">{bankInfo.bic || ''} </div>
          </div>
          <div className="flex mt-3 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">Bank Name </div>
            <div className="text-white">{bankInfo.bankName || ''} </div>
          </div>
          <div className="flex mt-3 items-start gap-4 text-sm justify-between">
            <div className="text-[#ADB1B8]">Bank Address </div>
            <div className="text-white text-right flex-1">
              {bankInfo.address || ''}
            </div>
          </div>
          <Form form={form} size="large">
            <Form.Item
              rules={[{ required: true, message: '' }]}
              name="transactionId"
            >
              <div className="mt-5">
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
              className="text-white flex-1 text-center cursor-pointer font-bold rounded-lg gold-gradient-bg leading-[48px] text-shadow"
            >
              Payment Completed
            </div>
          </div>
        </div>
      ) : null}
      {status === 'end' ? (
        <div className="px-4 !py-5">
          <img src={clock} className="m-auto mt-[30px] block w-[200px]" />
          <div className="text-center text-[24px] mb-[20px] mt-[50px] text-white leading-[32px]">
            Awaiting Approval
          </div>
          <div className="mt-6 text-[#ADB1B8] text-sm leading-[22px] text-center">
            This process may take up to one business day. Once we receive and
            confirm your deposit, we’ll notify you by email as soon as it’s
            approved.
          </div>
          <div className="flex items-center mt-[48px] justify-between">
            <div
              onClick={handlerCancel}
              className="text-white flex-1 text-center cursor-pointer font-bold rounded-lg gold-gradient-bg leading-[48px] text-shadow"
            >
              Done
            </div>
            <div
              onClick={() => {
                setVerifyModal(false);
                setStatus('first');
                if (list.length >= 5) {
                  setAlertInfo({
                    show: true,
                    message: 'You can only add up to 5 account',
                    type: 'error',
                  });
                  return;
                }
                history.push('/user/payment/addBank');
              }}
              className="border flex-1 ml-6 text-center cursor-pointer text-[#C69F58] font-bold border-[#4F4F4F] rounded-lg leading-[48px]"
            >
              Add new
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
