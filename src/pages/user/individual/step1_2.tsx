import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import TimeLine from '@/components/Timeline';
import { realnessVerify } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Form, Select } from 'antd';
import { useEffect } from 'react';
import GradientBorderBox from '@/components/GradientBorderBox';

export default function Step1_1() {
  const [form] = Form.useForm();
  const { individualData, setIndividualData } = useModel('verify');
  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
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
      history.push('/user/verification/individual/step2');
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      ...individualData,
    });
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
          <TimeLine active={1} progress={75} />
          <div className="w-full h-[600px] overflow-y-auto px-8">
            <div className="text-[24px] text-white font-bold mb-4">
              Financial Information
            </div>
            <Form
              form={form}
              layout="vertical"
              className="register-form-layout h-auto"
              size="large"
            >
              <Form.Item
                label={
                  <div className="relative mb-[20px] w-full">
                    <div>Planned Investment per Year(in USA)</div>
                    <div className="text-xs whitespace-nowrap absolute text-[#9EA6BC] mb-3">
                      Please choose the expected annual volume of transactions
                    </div>
                  </div>
                }
                name="plannedAnnualInvestment"
                rules={[
                  {
                    required: true,
                    message:
                      'Please select your Planned Investment per Year(in USA)!',
                  },
                ]}
              >
                <Select placeholder="Please Select">
                  <Select.Option value={'Less than 5000'}>
                    Less than 5000
                  </Select.Option>
                  <Select.Option value={'5,000–25,000'}>
                    5,000–25,000
                  </Select.Option>
                  <Select.Option value={'25,001-50,000'}>
                    25,001-50,000
                  </Select.Option>
                  <Select.Option value={'50,001-100,000'}>
                    50,001-100,000
                  </Select.Option>
                  <Select.Option value={'100,001-250,000'}>
                    100,001-250,000
                  </Select.Option>
                  <Select.Option value={'More than 250,000'}>
                    More than 250,000
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <div className="relative mb-[20px] w-full">
                    <div>Annual Personal Income/Earnings(in USA)</div>
                    <div className="text-xs whitespace-nowrap absolute text-[#9EA6BC] mb-3">
                      Please indicate your approximate annual income/earnirgs in
                      USA
                    </div>
                  </div>
                }
                name="annualEarnings"
                rules={[
                  {
                    required: true,
                    message:
                      'Please select your Planned Investment per Year(in USA)!',
                  },
                ]}
              >
                <Select placeholder="Please Select">
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
              <Form.Item
                label={
                  <div className="relative mb-[20px] w-full">
                    <div>Source of Funds</div>
                    <div className="text-xs whitespace-nowrap absolute text-[#9EA6BC] mb-3">
                      Please select the source of the funds you intend to
                      deposit
                    </div>
                  </div>
                }
                name="sourceOfFunds"
                rules={[
                  {
                    required: true,
                    message:
                      'Please select your Planned Investment per Year(in USA)!',
                  },
                ]}
              >
                <Select placeholder="Please Select">
                  <Select.Option value={'Salary/Empoloment Income'}>
                    Salary/Empoloment Income
                  </Select.Option>
                  <Select.Option value={'Savings'}>Savings</Select.Option>
                  <Select.Option value={'Business Income'}>
                    Business Income
                  </Select.Option>
                  <Select.Option value={'Inheritance'}>
                    Inheritance
                  </Select.Option>
                  <Select.Option value={'Sale of Assets'}>
                    Sale of Assets
                  </Select.Option>
                  <Select.Option
                    value={
                      'Income from investment in virtual currencies or tokens'
                    }
                  >
                    Income from investment in virtual currencies or tokens
                  </Select.Option>
                  <Select.Option value={'Income from other investments'}>
                    Income from other investments
                  </Select.Option>
                  <Select.Option value={'Others'}>Others</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <div className="relative mb-[20px] w-full">
                    <div>Estimated Total Wealth(in USA)</div>
                    <div className="text-xs whitespace-nowrap absolute text-[#9EA6BC] mb-3">
                      Please indicate your approximate annual income/earnirgs in
                      USA
                    </div>
                  </div>
                }
                name="estimatedTotalWealth"
                rules={[
                  {
                    required: true,
                    message:
                      'Please select your Planned Investment per Year(in USA)!',
                  },
                ]}
              >
                <Select placeholder="Please Select">
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
              className="w-[390px] cursor-pointer h-[48px] leading-[48px] text-center text-white font-[500] text-shadow gold-gradient-bg rounded-lg"
            >
              Continue
            </div>
            <div
              onClick={() => {
                history.back();
              }}
              className="flex-1 cursor-pointer h-[48px] leading-[48px] border border-[#25282C] rounded-lg font-[500] text-center"
            >
              Back
            </div>
          </div>
        </div>
      </GradientBorderBox>
    </>
  );
}
