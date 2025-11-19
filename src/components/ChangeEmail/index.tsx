import { ReactComponent as EmailSvg } from '@/assets/images/email.svg';
import { sendCaptcha, updateEmail } from '@/services/user';
import { useModel } from '@umijs/max';
import { Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { useCountdown } from './useCountdown';

interface EmailFormValues {
  oldEmail: string;
  newEmail: string;
  newEmail_1: string;
  captcha: string;
}

export default function ChangeEmail() {
  const [form] = Form.useForm<EmailFormValues>();
  const { emailModel, setEmailModel, setAlertInfo } = useModel('dialogState');
  const { setUser } = useModel('auth');
  const { countdown, isCounting, startCountdown } = useCountdown();

  const handleSend = async () => {
    if (!isCounting && form.getFieldValue('newEmail')) {
      try {
        await sendCaptcha({
          templateType: 7,
          email: form.getFieldValue('newEmail'),
        });
        startCountdown();
        setAlertInfo({
          show: true,
          message: 'Verification code sent successfully',
          type: 'success',
        });
      } catch (error) {
        setAlertInfo({
          show: true,
          message: 'Failed to send verification code',
          type: 'error',
        });
      }
    }
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const response = await updateEmail({
        email: values.newEmail,
        code: values.captcha,
      });

      if (response.success) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const updatedUserInfo = {
          ...userInfo,
          email: values.newEmail,
        };

        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setUser(updatedUserInfo);
        setAlertInfo({
          type: 'success',
          message: 'Email updated successfully',
          show: true,
        });
        setEmailModel(false);
        form.resetFields();
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to update email';

      if (error.name === 'ValidationError') {
        return; // Form validation error, the form will handle displaying the error
      }

      setAlertInfo({
        type: 'error',
        message: errorMessage,
        show: true,
      });
    }
  };

  useEffect(() => {
    if (!emailModel) {
      form.resetFields();
    }
  }, [emailModel]);

  return (
    <Modal
      onCancel={() => setEmailModel(false)}
      centered
      maskClosable={false}
      footer={null}
      open={emailModel}
      width={500}
    >
      <div className="px-4 py-[15px]">
        <div className="text-[24px] mb-[24px] font-bold text-center text-white">
          Change Email
        </div>
        <div className="px-[16px] py-[12px] mb-6 bg-[#FFA60014] leading-[22px] border-[1px] border-[#F3974F] rounded-lg text-[#EE6700] text-sm">
          For account security, please be aware that after changing your email,
          fiat withdrawals(burn) and transfers will be suspended for 24h
        </div>

        <Form form={form} size="large" layout="vertical" requiredMark={false}>
          <Form.Item
            label="Old Email"
            name="oldEmail"
            rules={[
              {
                required: true,
                message: 'Please enter your current email',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address',
              },
            ]}
          >
            <Input placeholder="Enter your current email" />
          </Form.Item>

          <Form.Item
            label="New Email"
            name="newEmail"
            rules={[
              {
                required: true,
                message: 'Please enter a new email',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value === getFieldValue('oldEmail')) {
                    return Promise.reject(
                      'New email cannot be the same as the old email',
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Enter your new email" />
          </Form.Item>

          <Form.Item
            label="Confirm New Email"
            name="newEmail_1"
            dependencies={['newEmail']}
            rules={[
              {
                required: true,
                message: 'Please confirm your new email',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newEmail') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two emails do not match');
                },
              }),
            ]}
          >
            <Input placeholder="Confirm your new email" />
          </Form.Item>

          <Form.Item
            label="Email Verification Code"
            name="captcha"
            rules={[
              {
                required: true,
                message: 'Please enter the verification code',
              },
            ]}
          >
            <Input
              suffix={
                <button
                  type="button"
                  className={`text-sm ${isCounting
                    ? 'text-gray-400'
                    : 'text-white hover:text-[#FFD58E] cursor-pointer'
                    }`}
                  onClick={handleSend}
                  disabled={isCounting || !form.getFieldValue('newEmail')}
                >
                  {isCounting ? `${countdown}s` : 'Send'}
                </button>
              }
              placeholder="Enter verification code"
            />
          </Form.Item>
          <div
            onClick={() => {
              window.open('/ContactUs', '_blank');
            }}
            className="text-xs cursor-pointer text-center text-[#C69F58]"
          >
            Having problems with verification?
          </div>
          <button
            type="button"
            onClick={() => onFinish()}
            className="w-full text-base hover:opacity-90 text-white h-[48px] mt-8 gold-gradient-bg rounded-[8px] transition-opacity"
            disabled={
              !form.isFieldsTouched(
                ['oldEmail', 'newEmail', 'newEmail_1', 'captcha'],
                true,
              )
            }
          >
            Confirm
          </button>
        </Form>
      </div>
    </Modal>
  );
}
