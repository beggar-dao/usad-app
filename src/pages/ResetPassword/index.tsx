import bgImg from '@/assets/images/login.png';
import GradientBorderBox from '@/components/GradientBorderBox';
import PageAnimate from '@/components/pageAnimate';
import { checkUser, resetPassword } from '@/services/user';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

const ResetPassword = () => {
  const { setLoginModel, resetStep, setAlertInfo } = useModel('dialogState');
  const { user, setUser } = useModel('auth');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { clearError } = useModel('auth');
  const [step, setStep] = useState(1);

  // Clear any previous errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(!showRepeatPassword);

  useEffect(() => {
    if (resetStep === 2) {
      setLoginModel(false);
      setStep(3);
    }
  }, [resetStep]);

  const handeConfirm = async (values: any) => {
    const params = {
      email: user.email,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
      captcha: localStorage.getItem('captcha'),
      totp: '',
    };
    await resetPassword(params);
    setAlertInfo({
      type: 'success',
      message: 'reset password success',
      show: true,
    });
    history.push('/');
  };

  const Steps = () => {
    const handleSubmit = async (values: any) => {
      if (!values.email) {
        setAlertInfo({
          type: 'error',
          message: 'Please enter a valid email!',
          show: true,
        });
        return;
      }

      setIsLoading(true);

      try {
        const res = await checkUser({ email: values.email });

        if (res.data) {
          setIsLoading(false);
          setUser({ ...user, email: values.email });
          setLoginModel(true);
          setStep(2);
        } else {
          setIsLoading(false);
          setAlertInfo({
            type: 'error',
            message: 'User not found',
            show: true,
          });
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    if (step <= 2) {
      return (
        <div className="w-[392px]">
          <h2 className="text-white text-[24px] mb-8 text-center">
            Reset Password
          </h2>

          <div className="alert-warning-box">
            <p className="pb-0 mb-0">
              <strong>Important: </strong>For account security, please be aware
              that after changing your password, fiat redemption and transfers
              will be suspended for 24h.
            </p>
          </div>
          <Form size="large" layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email!',
                },
              ]}
            >
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="gold-gradient-bg h-[48px] rounded-[12px] mt-32 text-shadow"
              loading={isLoading}
            >
              Next
            </Button>
          </Form>
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="w-[392px]">
          <h2 className="text-white text-[24px] mb-8 text-center">
            Reset Password
          </h2>
          <Form
            form={form}
            name="reset-password"
            onFinish={handeConfirm}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 8 characters!',
                },
              ]}
            >
              <Input.Password
                placeholder="Please enter a new password."
                iconRender={(visible) => {
                  return (
                    <button type="button" onClick={togglePasswordVisibility}>
                      {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                    </button>
                  );
                }}
                type={showPassword ? 'text' : 'password'}
              />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please enter your new password again.',
                },
                {
                  min: 8,
                  message: 'Password must be at least 8 characters!',
                },
              ]}
            >
              <Input.Password
                placeholder="Please enter your new password again."
                iconRender={(visible) => {
                  return (
                    <button
                      type="button"
                      onClick={toggleRepeatPasswordVisibility}
                    >
                      {visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                    </button>
                  );
                }}
                type={showPassword ? 'text' : 'password'}
              />
            </Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="gray-gradient-bg1 h-[48px] rounded-[12px] mt-32"
            >
              Confirm
            </Button>
          </Form>
        </div>
      );
    }
  };

  return (
    <PageAnimate>
      <div className="flex items-center h-screen">
        <GradientBorderBox className="max-w-[980px] m-auto my-10" gradientClassName="rounded-2xl">
          <div className="flex items-center justify-between p-12 black-gradient-bg2 rounded-2xl relative z-10 gap-4">
            <img
              src={bgImg}
              className="w-[346px]"
              alt="Reset Password Illustration"
            />
            <Steps />
          </div>
        </GradientBorderBox>
      </div>
    </PageAnimate>
  );
};

export default ResetPassword;
