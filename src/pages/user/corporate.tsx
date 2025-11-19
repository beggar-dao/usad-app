import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import GradientBorderBox from '@/components/GradientBorderBox';
import TimeLine from '@/components/Timeline';
import { businessRelness } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { ConfigProvider, Form, Input, Select } from 'antd';
import { Country } from 'country-state-city';
import { useEffect } from 'react';

export default function Step1_1() {
  const [form] = Form.useForm();
  const { setBusinessData, businessData } = useModel('verify');

  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      let res = await businessRelness({
        ...businessData,
        ...values,
      });
      setBusinessData({
        ...businessData,
        ...values,
        ...(res.data || {}),
      });
      history.push('/user/verification/corporate/step1');
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      ...businessData,
    });
  }, [businessData]);

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
          <TimeLine active={1} progress={50} />
          <div className="w-full h-[600px] overflow-y-auto px-8">
            <div className="text-[24px] text-white font-bold mb-3">
              Company information
            </div>
            <div className="text-sm !mb-4 text-[#666] leading-[24px]">
              The online registry search does not support this jurisdiction.
              Please provide company details manually.
            </div>
            <Form
              form={form}
              layout="vertical"
              className="h-auto"
              size="large"
            >
              <Form.Item
                label="Country"
                name="nationality"
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
                label="Company name"
                name="companyName"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Company name',
                  },
                ]}
              >
                <Input type="text" placeholder="Company name" />
              </Form.Item>
              <Form.Item
                label="Registration number"
                name="registrationNumber"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Registration number!',
                  },
                ]}
              >
                <Input type="text" placeholder="Registration number" />
              </Form.Item>
              <Form.Item
                label="Legal address"
                name="legalAddress"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Legal address',
                  },
                ]}
              >
                <Input type="text" placeholder="Legal address" />
              </Form.Item>
              <Form.Item
                label="Tax ID"
                name="taxId"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Tax ID',
                  },
                ]}
              >
                <Input type="text" placeholder="Tax ID" />
              </Form.Item>
            </Form>
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
              className="flex-1 cursor-pointer h-[48px] leading-[48px] border border-[#25282C] rounded-lg font-[500] text-center text-[#C69F58]"
            >
              Back
            </div>
          </div>
        </div>
      </GradientBorderBox>
    </>
  );
}
