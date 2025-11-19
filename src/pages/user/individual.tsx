import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import GradientBorderBox from '@/components/GradientBorderBox';
import TimeLine from '@/components/Timeline';
import { realnessVerify } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { ConfigProvider, DatePicker, Form, Input, Select } from 'antd';
import { Country } from 'country-state-city';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export default function Individual() {
  const [form] = Form.useForm();
  const { individualData, setIndividualData } = useModel('verify');

  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      console.log(values);

      let res = await realnessVerify({
        ...individualData,
        ...values,
        firstPhotoData_fileList: undefined,
        addressProof_fileList: undefined,
        personalPhotoData_fileList: undefined,
        secondPhotoData_fileList: undefined,
      });
      setIndividualData({
        ...individualData,
        ...values,
        ...res.data,
      });
      history.push('/user/verification/individual/step1_1');
    });
  };

  useEffect(() => {
    if (individualData && (individualData as any).birthday) {
      // 确保birthday是dayjs对象格式
      form.setFieldsValue({
        ...individualData,
        birthday:
          typeof (individualData as any).birthday === 'string'
            ? dayjs((individualData as any).birthday)
            : (individualData as any).birthday,
      });
    } else {
      form.setFieldsValue({
        ...individualData,
      });
    }
  }, [individualData]);

  return (
    <>
      <div className="flex items-center justify-between pb-3 text-[24px] font-bold text-[#202B4B]">
        <div></div>
        <CloseSvg
          className="cursor-pointer"
          onClick={() => {
            history.push('/user/verification');
          }}
        />
      </div>
      <GradientBorderBox className="w-[588px] m-auto" gradientClassName="rounded-[16px]">
        <div className="relative z-10 rounded-[16px] pt-[40px] black-gradient-bg5">
          <TimeLine active={1} progress={25} />
          <div className="w-full h-[600px] overflow-y-auto px-8">
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    itemMarginBottom: 16,
                  },
                },
              }}
            >
              <div className="text-[24px] text-white font-bold mb-4">
                Personal Details
              </div>
              <Form
                form={form}
                layout="vertical"
                className="h-auto"
                size="large"
              >
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
                <Form.Item
                  label="Date of birth"
                  name="birthday"
                  rules={[
                    { required: true, message: 'Please enter your email!' },
                  ]}
                >
                  <DatePicker
                    placeholder="mm/dd/yyyy"
                    format="MM/DD/YYYY"
                    maxDate={dayjs()}
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="Country of birth"
                  name="birthCountry"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your country!',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select your country"
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
                <Form.Item
                  label="Nationaliy"
                  name="nationality"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your nationaliy!',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select your nationaliy"
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
              </Form>
            </ConfigProvider>
          </div>
          <div className="w-full rounded-bl-2xl rounded-br-2xl  h-[104px] px-[40px] gap-[23px] flex items-center justify-between">
            <div
              onClick={handleSubmit}
              className="w-[390px] cursor-pointer h-[48px] leading-[48px] text-center text-white font-[500] gold-gradient-bg rounded-lg text-shadow"
            >
              Continue
            </div>
            <div
              onClick={() => {
                history.back();
              }}
              className="flex-1 cursor-pointer h-[48px] leading-[48px] border border-[#25282C] bg-[#1E2023] rounded-lg font-[500] text-center text-[#C69F58]"
            >
              Back
            </div>
          </div>
        </div>
      </GradientBorderBox>
    </>
  );
}
