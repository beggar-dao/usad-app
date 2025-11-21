import { ReactComponent as EmailSvg } from '@/assets/images/email.svg';
import { ReactComponent as GoogleSvg } from '@/assets/images/google.svg';
import { disable2faAxios, secondaryLogin, sendCaptcha } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Checkbox, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

export default function SecurityVerification({
  disabled2fa = false,
  isResetPassword = false,
}) {
  const {
    addressObj,
    updateAddress,
    handleSettingAddressWhitelistPost,
    handlerDeleteWallet,
    batchAddress,
    setAddressObj,
  } = useModel('addressWhiteList');
  const [form] = Form.useForm();
  const { user, setUser, setIsAuthenticated } = useModel('auth');
  const [countdown, setCountdown] = useState(0); // 倒计时秒数
  const [isCounting, setIsCounting] = useState(false); // 是否正在倒计时
  const { loginModel, setLoginModel, setAlertInfo, setResetStep } =
    useModel('dialogState');
  const { handlerTransfer, transferForm, withDrawForm, handlerWithDraw } =
    useModel('gbpc');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false); // 倒计时结束
    }
    return () => clearTimeout(timer); // 清除定时器
  }, [countdown, isCounting]);

  const handleSend = () => {
    if (!isCounting) {
      sendCaptcha({
        templateType: isResetPassword ? 13 : disabled2fa ? 3 : 2,
        email: user.email,
      });

      setCountdown(60); // 设置倒计时为 60 秒
      setIsCounting(true);
    }
  };

  useEffect(() => {
    if (loginModel) {
      handleSend();
    }
    if (!loginModel) {
      setAddressObj({});
    }
  }, [loginModel]);

  const onFinish = async () => {
    if (isResetPassword) {
      const captcha = form.getFieldValue('captcha');
      localStorage.setItem('captcha', captcha);
      setResetStep(2);
      return;
    }

    let values = await form.validateFields();

    if (withDrawForm.valid) {
      handlerWithDraw(values);
      return;
    }

    if (transferForm.valid) {
      handlerTransfer(values);
      return;
    }

    if (addressObj.delete) {
      handlerDeleteWallet({
        ...values,
        id: addressObj.id,
      });
      return;
    }

    if (addressObj.setting) {
      handleSettingAddressWhitelistPost({
        ...values,
        newAddressTransferLock: 0,
      });
      return;
    }

    if (addressObj.batch) {
      batchAddress(values);
      return;
    }

    if (Object.values(addressObj).length) {
      updateAddress(values);
      return;
    }

    let res = disabled2fa
      ? await disable2faAxios({
        ...values,
      })
      : await secondaryLogin({
        userId: user.id,
        ...values,
      });
    let data = res?.data || {};

    if (disabled2fa) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...userInfo,
          is2FA: false,
        }),
      );
      setUser({
        ...userInfo,
        is2FA: false,
      });
      setLoginModel(false);
      return;
    }

    setIsAuthenticated(data?.tokenInfo?.tokenValue);
    setUser(data);
    localStorage.setItem('token', data?.tokenInfo?.tokenValue);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setLoginModel(false);
    setAlertInfo({
      type: 'success',
      message: 'Login successful!',
      show: true,
    });
    history.push(!data.is2FA ? '/user/profile' : '/');
  };

  useEffect(() => {
    if (!loginModel) {
      form.resetFields();
    }
  }, [loginModel]);

  return (
    <Modal
      onCancel={() => {
        setLoginModel(false);
      }}
      centered
      zIndex={9999}
      maskClosable={false}
      footer={null}
      open={loginModel}
    >
      <div className="px-[16px] py-[16px]">
        <div
          className={`text-[24px] ${disabled2fa ? 'mb-[8px]' : 'mb-[30px]'
            } font-bold text-center`}
        >
          {withDrawForm.valid
            ? 'Confirm to Withdraw'
            : transferForm.valid
              ? 'Confirm Transfer'
              : addressObj.setting
                ? 'Disable 24 Hour Lock'
                : addressObj.batch
                  ? 'Add in Batches'
                  : addressObj.add
                    ? 'Add an Address'
                    : addressObj.delete
                      ? 'Delete Address'
                      : disabled2fa
                        ? `Two-Factor Authentication`
                        : `Security Verification`}
        </div>

        {withDrawForm.valid ? (
          <>
            <div className="flex !pb-4 text-[#202B4B] items-center justify-between">
              <div className="text-[#5B6276]">Transfer to</div>
              <div className="line-clamp-1 text-right flex-1">
                {withDrawForm.burnAddress || ''}
              </div>
            </div>
            <div className="flex !pb-4 mb-[30px] text-[#202B4B] border-b border-b-[#E9E9E9] items-center justify-between">
              <div className="text-[#5B6276]">Account Number</div>
              <div>
                {withDrawForm?.bankInfo?.iban || ''}
                {/* <span className="text-[#63BCFF] cursor-pointer">
                  Change Account
                </span> */}
              </div>
            </div>
          </>
        ) : null}

        {transferForm.valid ? (
          <div className="flex !pb-4 mb-[30px] text-[#202B4B] border-b border-b-[#E9E9E9] items-center justify-between">
            <div className="text-[#5B6276]">Transfer to</div>
            <div className="line-clamp-1 text-right flex-1">
              {transferForm.toAddress || ''}
            </div>
          </div>
        ) : null}

        {disabled2fa ? (
          <div className="text-center mb-[30px] text-xs text-[#5b6276]">
            Please enter the following information for payment.
          </div>
        ) : null}

        {addressObj.add || addressObj.batch ? (
          <div className="px-[16px] py-[12px] mb-4 bg-[#FFA60014] leading-[22px] border-[1px] border-[#F3974F] rounded-lg text-[#EE6700] text-sm">
            Verification is required before you can add an address.
          </div>
        ) : null}

        {addressObj.setting ? (
          <div className="px-[16px] py-[12px] mb-4 bg-[#FFA60014] leading-[22px] border-[1px] border-[#F3974F] rounded-lg text-[#EE6700] text-sm">
            When disabled, new transfer addresses are locked for 24h. Deposits
            are still allowed, but transfers and adding new wallets are blocked
            during this period.
          </div>
        ) : null}

        <Form form={form} size="large">
          <div className="flex items-center mb-3 text-[14px] text-[#D9D9D9]">
            <EmailSvg className="mr-3" />A verification code will be sent to{' '}
            <span className="text-[#6ECE82] pl-1 font-normal">
              {user.email || ''}
            </span>
          </div>

          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: 'Please enter the email verification code',
              },
            ]}
          >
            <Input
              suffix={
                <div
                  className={`text-sm h-[26px] ${isCounting
                    ? 'text-gray-400'
                    : 'text-[#63BCFF] cursor-pointer'
                    }`}
                  onClick={handleSend}
                >
                  {isCounting ? `${countdown}s` : 'Send'}
                </div>
              }
              placeholder="Please enter the email verification code"
            />
          </Form.Item>
          {user.is2FA ? (
            <>
              <div className="flex items-center mb-3 text-[14px] text-[#D9D9D9]">
                <GoogleSvg className="mr-3" />
                Google 2FA Code
              </div>
              <Form.Item
                name="totp"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the Google Authenticator code',
                  },
                ]}
              >
                <Input placeholder="Please enter the Google Authenticator code" />
              </Form.Item>
            </>
          ) : null}

          {withDrawForm.valid || transferForm.valid ? (
            <Form.Item name={'checked'} valuePropName="checked">
              <Checkbox>
                No verification needed for this address next time
              </Checkbox>
            </Form.Item>
          ) : null}
        </Form>
        <div className="flex mt-12 items-center justify-between gap-6">
          <div
            onClick={() => onFinish()}
            className="text-base hover:opacity-90 flex-1 text-white h-[48px] text-center gold-gradient-bg leading-[48px] cursor-pointer rounded-[8px]"
          >
            {disabled2fa ? 'Disable' : 'Confirm'}
          </div>
          <div
            onClick={() => setLoginModel(false)}
            className="flex-1 hover:opacity-90 border border-[#505050] text-center h-[48px] leading-[48px] cursor-pointer rounded-[8px]"
          >
            Cancel
          </div>
        </div>
        {!disabled2fa ? (
          <div
            onClick={() => {
              window.open('/ContactUs', '_blank');
            }}
            className="text-xs cursor-pointer text-center text-[#FFD58E] mt-[16px]"
          >
            Having problems with verification?
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
