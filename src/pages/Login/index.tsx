import bgImg from '@/assets/images/login.png';
import GradientBorderBox from '@/components/GradientBorderBox';
import PageAnimate from '@/components/pageAnimate';
import type { LoginFormData } from '@/services/types/auth';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';

const LoginForm = () => {
  const [form] = Form.useForm();
  const { login, loginLoading, clearError, setUser } = useModel('auth');
  const { isWeb } = useModel('window');
  const [showPassword, setShowPassword] = useState(false);

  // Clear any previous errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  /**
   * Handle form submission
   */
  const handleSubmit = async (values: LoginFormData) => {
    try {
      clearError(); // Clear any previous errors
      await login({
        email: values.email,
        password: values.password,
      });
      // Success message and redirect are handled in the auth model
    } catch (error) {
      // Error is handled in the auth model
      console.error('Login error:', error);
    }
  };

  /**
   * Handle form validation failure
   */
  const handleSubmitFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
  };

  useEffect(() => {
    localStorage.clear();
    setUser({});
  }, []);

  return (
    <PageAnimate>
      <div className="flex items-center h-screen">
        <GradientBorderBox className='max-w-[980px] m-auto my-10' gradientClassName='rounded-2xl'>
          <div
            className={`${isWeb
              ? 'w-full flex items-center justify-between p-10 black-gradient-bg2 rounded-2xl relative z-10'
              : ''
              }`}
          >
            {isWeb && (
              <img
                className="block w-[346px]"
                src={bgImg}
                alt="Login Illustration"
              />
            )}
            <div className={`${isWeb ? 'w-[392px]' : ''}`}>
              <div className={`${isWeb ? 'container mt-0 px-6' : 'px-[20px]'}`}>
                <h2
                  className={`${isWeb
                    ? 'text-[24px] !mb-8 text-center'
                    : 'text-[18px] pt-[16px] pb-[10px] leading-[26px] font-[700]'
                    }`}
                >
                  Welcome back!
                </h2>
                <Spin spinning={loginLoading}>
                  <Form
                    form={form}
                    name="login"
                    onFinish={handleSubmit}
                    onFinishFailed={handleSubmitFailed}
                    layout="vertical"
                    className="register-form"
                    size="large"
                  >
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
                      <Input
                        placeholder="Enter your email"
                        className="register-input"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your password!',
                        },
                        {
                          min: 6,
                          message: 'Password must be at least 6 characters!',
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter your password"
                        className="register-input"
                        iconRender={(visible) => {
                          return (
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                            >
                              {visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )}
                            </button>
                          );
                        }}
                        type={showPassword ? 'text' : 'password'}
                      />
                    </Form.Item>

                    <Form.Item
                      name="rememberMe"
                      valuePropName="checked"
                      className="checkbox-top-align"
                    >
                      <Checkbox>
                        <span className="font-[300] text-[#ADB1B8]">
                          Remember Me
                        </span>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="h-[48px] gold-gradient-bg rounded-[12px] text-shadow"
                        loading={loginLoading}
                        disabled={loginLoading}
                        block
                      >
                        {loginLoading ? 'Logging in...' : 'Log in'}
                      </Button>
                    </Form.Item>
                  </Form>
                </Spin>
                <div className="flex justify-between">
                  <p className="text-[#ADB1B8] font-[300] !text-xs !border-0">
                    Don&apos;t have an account yet?{' '}
                    <a className="text-[#C69F58]" href="/Auth/CreateAccount">
                      Register
                    </a>
                  </p>
                  <p className="font-[300] !text-xs !border-0">
                    Forgot password?{' '}
                    <a className="text-[#C69F58]" href="/Auth/ResetPassword">
                      Reset
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GradientBorderBox>
      </div>
    </PageAnimate>
  );
};

export default LoginForm;
