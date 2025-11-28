import bgImg from '@/assets/images/login.png';
import GradientBorderBox from '@/components/GradientBorderBox';
import PageAnimate from '@/components/pageAnimate';
import type { RegisterFormData } from '@/services/types/auth';
import { history, useModel } from '@umijs/max';
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

const CreateAccountForm = () => {
  const { isWeb } = useModel('window');
  const [form] = Form.useForm();
  const {
    sendRegisterCaptcha,
    register,
    captchaLoading,
    registerLoading,
    // error,
    clearError,
  } = useModel('auth');
  // const [captchaSent, setCaptchaSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [availableStates, setAvailableStates] = useState<any[]>([]);
  const [countdown, setCountdown] = useState(0); // 倒计时秒数
  const [isCounting, setIsCounting] = useState(false); // 是否正在倒计时
  const [submittable, setSubmittable] = useState(false);

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

  // Clear any previous errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  /**
   * Handle country change and update available states
   */
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    form.setFieldsValue({ country: countryCode, province: '' });

    // Update available states
    if (countryCode) {
      const states = State.getStatesOfCountry(countryCode);
      setAvailableStates(states);
    } else {
      setAvailableStates([]);
    }
  };

  /**
   * Handle captcha sending
   */
  const handleSendCaptcha = async () => {
    try {
      clearError(); // Clear any previous errors
      const email = form.getFieldValue('email');
      if (!email) {
        form.setFields([
          {
            name: 'email',
            errors: ['Please enter your email address!'],
          },
        ]);
        return;
      }
      await sendRegisterCaptcha({ templateType: 1, email });
      // setCaptchaSent(true);
      setCountdown(60); // 设置倒计时为 60 秒
      setIsCounting(true);
    } catch (error) {
      console.error('Send captcha error:', error);
      // Error message is handled by the auth model
    }
  };

  /**
   * Handle registration form submission
   */
  const handleRegister = async (values: RegisterFormData) => {
    try {
      clearError(); // Clear any previous errors

      // Convert form values to match API interface
      const registerData = {
        email: values.email,
        captcha: values.captcha,
        username: values.username,
        firstname: values.firstName,
        lastname: values.lastName,
        avatar: values.avatar,
        password: values.password,
        country: values.country,
        province: values.province,
        estimatedAmount: parseInt(values.estimatedAmount.toString()),
        isBuyRedeem: values.isBuyRedeem,
      };

      await register(registerData);

      // Success message is handled in the auth model
      // Add a small delay to ensure the success message is visible before redirect
      setTimeout(() => {
        history.push('/auth/login');
      }, 1500); // 1.5 second delay to show success message
    } catch (error) {
      console.error('Registration error:', error);
      // Error message is handled by the auth model
    }
  };

  /**
   * Handle form validation failure
   */
  const handleSubmitFailed = (errorInfo: any) => {
    console.log('Form validation failed:', errorInfo);
  };

  const watchFields = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, watchFields]);

  return (
    <PageAnimate>
      <div className={`${isWeb ? 'flex items-center' : ''}`}>
        <GradientBorderBox
          className="max-w-[980px] m-auto my-10"
          gradientClassName="rounded-2xl"
        >
          <section
            className={`${
              isWeb
                ? 'relative z-10 flex items-center justify-between gap-4 p-10 black-gradient-bg2 rounded-2xl overflow-hidden'
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
            <div className={`${isWeb ? 'w-[488px]' : 'w-full px-[20px]'}`}>
              {/* Fixed Header */}
              <div
                className={`${isWeb ? ' border-b-0 pb-0' : 'bg-transparent'}`}
              >
                <h2
                  className={`${
                    isWeb
                      ? 'text-[24px] text-center mb-8'
                      : 'text-left text-[18px] mb-[10px]'
                  }`}
                >
                  Create an USAD Account
                </h2>
              </div>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleRegister}
                onFinishFailed={handleSubmitFailed}
                size="large"
              >
                {/* Scrollable Content Area */}
                <div
                  className={`${
                    isWeb
                      ? 'px-[12px] pt-0 max-h-[460px] overflow-y-auto'
                      : 'pb-[300px]'
                  }`}
                >
                  {/* First Name and Last Name */}
                  <div
                    style={{ display: isWeb ? 'flex' : 'block', gap: '10px' }}
                  >
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      style={{ flex: 1 }}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your first name!',
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Your First Name" />
                    </Form.Item>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      style={{ flex: 1 }}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your last name!',
                        },
                      ]}
                    >
                      <Input type="text" placeholder="Your Last Name" />
                    </Form.Item>
                  </div>
                  {/* Email field */}
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email!' },
                      {
                        type: 'email',
                        message: 'Please enter a valid email!',
                      },
                    ]}
                  >
                    <Input type="email" placeholder="Your Email Address" />
                  </Form.Item>

                  {/* Verification Code with Send Button */}
                  <Form.Item
                    label="Verification Code"
                    name="captcha"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the verification code!',
                      },
                    ]}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                      }}
                    >
                      <Input
                        type="text"
                        placeholder="Enter verification code from email"
                        style={{ flex: '1 1 auto', minWidth: 0 }}
                      />
                      <Button
                        type="primary"
                        onClick={handleSendCaptcha}
                        loading={captchaLoading}
                        disabled={isCounting}
                        className="gold-gradient-bg text-sm h-[48px] rounded-lg text-shadow"
                        style={{ flexShrink: 0, width: 'auto' }}
                      >
                        {captchaLoading
                          ? 'Sending...'
                          : isCounting
                          ? `${countdown}s`
                          : 'Send Code'}
                      </Button>
                    </div>
                  </Form.Item>

                  {/* Password */}
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '',
                      },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject('');
                          } else if (
                            value &&
                            value.length >= 8 &&
                            /[a-z]/.test(value) &&
                            /[A-Z]/.test(value) &&
                            /\d/.test(value)
                          ) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject('');
                          }
                        },
                      },
                    ]}
                  >
                    <div className="password-wrapper">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        style={{ paddingRight: '40px' }}
                      />
                      <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '25px',
                          cursor: 'pointer',
                          zIndex: 1,
                        }}
                      >
                        <i
                          className={`bi ${
                            showPassword ? 'bi-eye' : 'bi-eye-slash'
                          }`}
                        ></i>
                      </span>
                      <div className="flex justify-between pt-[10px] w-full">
                        <div className="w-[22%]">
                          <div
                            className={`h-[2px] rounded-full ${
                              watchFields?.password?.length >= 8
                                ? 'gold-gradient-bg'
                                : 'bg-[#eee]'
                            }`}
                          ></div>
                          <div className="font-inter text-[#9EA6BC] text-[12px] leading-[18px] font-normal">
                            8 symbols
                          </div>
                        </div>
                        <div className="w-[22%]">
                          <div
                            className={`h-[2px] rounded-full ${
                              /[a-z]/.test(watchFields?.password) &&
                              watchFields?.password?.length
                                ? 'gold-gradient-bg'
                                : 'bg-[#eee]'
                            }`}
                          ></div>
                          <div className="font-inter text-[#9EA6BC] text-[12px] leading-[18px] font-normal">
                            Lower Case
                          </div>
                        </div>
                        <div className="w-[22%]">
                          <div
                            className={`h-[2px] rounded-full ${
                              /[A-Z]/.test(watchFields?.password)
                                ? 'gold-gradient-bg'
                                : 'bg-[#eee]'
                            }`}
                          ></div>
                          <div className="font-inter text-[#9EA6BC] text-[12px] leading-[18px] font-normal">
                            Upper Case
                          </div>
                        </div>
                        <div className="w-[22%]">
                          <div
                            className={`h-[2px] rounded-full ${
                              /[0-9]/.test(watchFields?.password)
                                ? 'gold-gradient-bg'
                                : 'bg-[#eee]'
                            }`}
                          ></div>
                          <div className="font-inter text-[#9EA6BC] text-[12px] leading-[18px] font-normal">
                            Number
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form.Item>

                  {/* Confirm Password */}
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Passwords do not match!'),
                          );
                        },
                      }),
                    ]}
                  >
                    <div
                      className="password-wrapper password-wrapper2"
                      style={{ position: 'relative' }}
                    >
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        style={{ paddingRight: '40px' }}
                      />
                      <span
                        className="toggle-password toggle-password2"
                        onClick={toggleConfirmPasswordVisibility}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          cursor: 'pointer',
                          zIndex: 1,
                        }}
                      >
                        <i
                          className={`bi ${
                            showConfirmPassword ? 'bi-eye' : 'bi-eye-slash'
                          }`}
                        ></i>
                      </span>
                    </div>
                  </Form.Item>

                  {/* Country */}
                  <Form.Item
                    label="Country of Residency"
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your country!',
                      },
                    ]}
                  >
                    <Select
                      className="no-border-select"
                      showSearch
                      placeholder="Select your country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      filterOption={(input, option) =>
                        (option?.children ?? '')
                          .toString()
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {Country.getAllCountries().map((country) => (
                        <Select.Option
                          key={country.isoCode}
                          value={country.isoCode}
                        >
                          {country.flag} {country.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Province */}
                  <Form.Item
                    label="State/Province"
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your region!',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      className="no-border-select"
                      placeholder="Select your state/province"
                      disabled={
                        !selectedCountry || availableStates.length === 0
                      }
                      filterOption={(input, option) =>
                        (option?.children ?? '')
                          .toString()
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      notFoundContent={
                        !selectedCountry
                          ? 'Please select a country first'
                          : availableStates.length === 0
                          ? 'No states/provinces available'
                          : 'No matching states/provinces'
                      }
                    >
                      {availableStates.map((state) => (
                        <Select.Option
                          key={state.isoCode}
                          value={state.isoCode}
                        >
                          {state.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Estimated Amount */}
                  <Form.Item
                    label="Estimated amount per transaction"
                    name="estimatedAmount"
                    rules={[
                      { required: true, message: 'Please select an amount!' },
                    ]}
                  >
                    <Select
                      placeholder="Select an approximate amount"
                      className="no-border-select"
                    >
                      <Select.Option value={100}>Under 10,000</Select.Option>
                      <Select.Option value={500}>10,000–50,000</Select.Option>
                      <Select.Option value={1000}>1,000,000+</Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                {/* Fixed Bottom Area */}
                <div
                  className={`${
                    isWeb
                      ? 'relative border-t-0'
                      : 'absolute bottom-0 left-[0] right-[0] px-[20px]'
                  }`}
                >
                  <div
                    className={`absolute ${
                      isWeb
                        ? 'left-[-30px] top-0 bottom-[-30px] right-[-30px]'
                        : 'left-[-20px] right-[-20px] px-[20px]'
                    }`}
                  ></div>
                  {/* Buy/Redeem Question */}
                  <div className="relative z-40 px-[20px]">
                    <Form.Item
                      name="isBuyRedeem"
                      rules={[
                        {
                          required: true,
                          message: '',
                        },
                        () => ({
                          validator(_, value) {
                            if (value === 'false') {
                              return Promise.reject(new Error(''));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                      className="mb-[10px]"
                    >
                      <div
                        className="d-flex align-items-center justify-between text-[12px]"
                        style={{ gap: '8px' }}
                      >
                        <span>
                          Looking to buy or redeem USA-pegged USAD tokens?
                        </span>
                        <Radio.Group>
                          <div className="d-flex align-items-center">
                            <Radio value={true} className="text-[12px]">
                              Yes
                            </Radio>
                            <Radio value={false} className="text-[12px]">
                              No
                            </Radio>
                          </div>
                        </Radio.Group>
                      </div>
                    </Form.Item>

                    {/* Terms and Conditions */}
                    <Form.Item
                      name="acceptTerms"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error('Agree to terms and conditions'),
                                ),
                        },
                      ]}
                    >
                      <div className="flex items-start text-[12px]">
                        <Checkbox></Checkbox>
                        <div className="ml-2 text-[#666]">
                          By creating an account, you agree to the{' '}
                          <a
                            className="text-[#C69F58]"
                            href="/pdf/GBPC - Terms of Service.pdf"
                            target="_blank"
                          >
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a
                            className="text-[#C69F58]"
                            href="/pdf/GBPC - Privacy Policy.pdf"
                            target="_blank"
                          >
                            Privacy Policy .
                          </a>
                        </div>
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="h-[48px] rounded-[12px] register-button"
                        loading={registerLoading}
                        disabled={registerLoading || !submittable}
                        block
                      >
                        {registerLoading
                          ? 'Creating Account...'
                          : 'Create Account'}
                      </Button>
                    </Form.Item>

                    <div className="text-center">
                      <p className="text-[#666]">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-[#C69F58]">
                          Log in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </section>
        </GradientBorderBox>
      </div>
    </PageAnimate>
  );
};

export default CreateAccountForm;
