import { bind2fa, get2fa, getSelf, updateUser } from '@/services/user';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, ConfigProvider, Form, Input, Select } from 'antd';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

export default function ProfileTab1() {
  const [qrCode, setQrCode] = useState<any>({});
  const [_, setSelf] = useState<any>({});
  const { user, setUser } = useModel('auth');
  const [code, setCode] = useState('');
  const [form] = Form.useForm();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [availableStates, setAvailableStates] = useState<any[]>([]);
  const { setAlertInfo } = useModel('dialogState');

  const getSelfFunc = async () => {
    const res = await getSelf();
    form.setFieldsValue(res?.data || {});

    // Update available states
    if (res?.data?.country) {
      setSelectedCountry(res.data.country);
      const states = State.getStatesOfCountry(res?.data?.country);
      setAvailableStates(states);
    } else {
      setAvailableStates([]);
    }
    setSelf(res?.data || {});
  };

  const getQrCodeFunc = async () => {
    const res = await get2fa();
    setQrCode(res?.data || {});
  };
  const bindCode = async () => {
    await bind2fa({
      totp: code,
    });
    setAlertInfo({
      type: 'success',
      message: 'Enable successfully!',
      show: true,
    });
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ ...userInfo, is2FA: true }),
    );
    setUser({
      ...userInfo,
      is2FA: true,
    });
  };
  function fallbackCopyTextToClipboard(text = '') {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Could not copy text', err);
    }
    document.body.removeChild(textArea);
  }
  const copy = (text: string) => {
    if (navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard
        .writeText(text)
        .then(() => { })
        .catch((err) => {
          console.error('Failed to copy:', err);
          fallbackCopyTextToClipboard(text); // 回退到 execCommand
        });
    } else {
      fallbackCopyTextToClipboard(text);
    }
    setAlertInfo({
      type: 'success',
      message: 'Copied successfully',
      show: true,
    });
  };
  useEffect(() => {
    getQrCodeFunc();
    getSelfFunc();
  }, []);
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

  const handleSubmit = async (values: any) => {
    console.log(values);
    await updateUser(values);
    getSelfFunc();
    setAlertInfo({
      type: 'success',
      message: 'Profile updated successfully',
      show: true,
    });
  };

  return (
    <div className="flex justify-between gap-[60px]">
      <div className="flex-1 mt-[22px]">
        <ConfigProvider
          theme={{
            components: {
              Form: {
                itemMarginBottom: 16,
              },
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="register-form-layout"
            size="large"
          >
            <div className="flex gap-8 justify-between">
              <div className="flex-1">
                <Form.Item
                  label="First Name"
                  name="firstname"
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your first name!',
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your First Name"
                    className="register-input"
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <Form.Item
                  label="Last Name"
                  name="lastname"
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your last name!',
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your Last Name"
                    className="register-input"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="">
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
                <Input type="email" disabled placeholder="Your Email Address" />
              </Form.Item>
            </div>
            <div className="flex mt-0 gap-8 justify-between">
              <div className="flex-1">
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
                    showSearch
                    size="large"
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
              </div>
              <div className="flex-1">
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
                    size="large"
                    placeholder="Select your state/province"
                    disabled={!selectedCountry || availableStates.length === 0}
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
                      <Select.Option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mt-0">
              <div className="text-sm text-[#5B6276] mb-2">Time zone</div>
              <div className="bg-[#1E2023] rounded px-4 h-[48px] leading-[48px] text-sm">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </div>
            </div>
            <Button
              htmlType="submit"
              type="primary"
              className="gradient-button mt-12 cursor-pointer flex justify-center items-center text-center text-white"
            >
              Confirm
            </Button>
          </Form>
        </ConfigProvider>
      </div>
      {!user.is2FA ? (
        <div className="p-[40px] mt-[32px] rounded-[8px] max-w-[424px] text-white bg-[#1A1A1B] border-[1px] border-[#505050]">
          <div className="text-center text-[16px] font-[600]">
            Set up Two-factor Authentication
          </div>
          <div className="mt-3 text-sm leading-[22px] text-center text-[#71757A]">
            If you don't already have an authenticator app, download Google
            Authenticator from the App Store or Play Store.
          </div>
          <div className="mt-6 text-xs font-[600] flex items-center gap-2">
            <CheckOutlined className="text-[#9EE29D]" />
            <div>Open Authenticator App</div>
          </div>
          <div className="mt-3 text-xs font-[600] flex items-center gap-2">
            <CheckOutlined className="text-[#9EE29D]" />
            <div>Scan the QR code to add a new token</div>
          </div>
          <div className="mt-9">
            <img
              src={`data:image/png;base64,${qrCode?.qrCodeImage}`}
              className="m-auto  mb-2 block w-[160px] h-[160px]"
            />
            <div className="flex text-sm items-center justify-center">
              Account token (Key): {qrCode?.secret}{' '}
              <CopyOutlined
                onClick={() => copy(qrCode?.secret)}
                className="ml-2 cursor-pointer"
              />
            </div>
            <div className="mt-8">
              <div className="text-sm mb-2">
                Google Authentication*
              </div>
              <Input
                size="large"
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Google Authenticator code"
              />
              <div className="flex justify-center">
                <Button
                  onClick={bindCode}
                  className="mt-[40px] cursor-pointer text-white text-center gray-gradient-button"
                >
                  Enable
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
