import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import GradientBorderBox from '@/components/GradientBorderBox';
import TimeLine from '@/components/Timeline';
import { businessRelness } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { ConfigProvider, Form, Input, Select } from 'antd';
import { useEffect } from 'react';

export default function Step1_1() {
  const [form] = Form.useForm();
  const { setBusinessData, businessData } = useModel('verify');
  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      let res = await businessRelness({
        ...businessData,
        ...values,
      });
      setBusinessData({
        ...businessData,
        ...values,
        ...(res.data || {}),
      });
      history.push('/user/verification/corporate/step2_1');
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
          <TimeLine active={1} progress={100} />
          <div className="w-full h-[600px] overflow-y-auto px-8">
            <div className="text-[24px] text-white font-bold mb-3">
              Industry
            </div>
            <div className="text-sm !mb-4 text-[#666] leading-[24px]">
              Check the associated parties of your company and,if necessary,
              edit them
            </div>
            <Form
              form={form}
              layout="vertical"
              className="register-form-layout h-auto"
              size="large"
            >
              <Form.Item
                label="Industry"
                name="industryDescription"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message:
                      'Please describe the business industry your company is involved in.',
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Please describe the business industry your company is involved in."
                  className="register-input"
                />
              </Form.Item>
              <Form.Item
                label="Planned Investment per Year(in GBP)"
                name="plannedInvestment"
                rules={[
                  {
                    required: true,
                    message:
                      'Please choose the expected annual volume of incoming transfers',
                  },
                ]}
              >
                <Select placeholder="Please choose the expected annual volume of incoming transfers">
                  <Select.Option value={'Less than 10,000'}>
                    Less than 10,000
                  </Select.Option>
                  <Select.Option value={'10,001–50,000'}>
                    10,001–50,000
                  </Select.Option>
                  <Select.Option value={'50,001-100,000'}>
                    50,001-100,000
                  </Select.Option>
                  <Select.Option value={'100,001-250,000'}>
                    100,001-250,000
                  </Select.Option>
                  <Select.Option value={'250,001-500,000'}>
                    250,001-500,000
                  </Select.Option>
                  <Select.Option value={'More than 500,000'}>
                    More than 500,000
                  </Select.Option>
                </Select>
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
