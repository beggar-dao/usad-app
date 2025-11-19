import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import TimeLine from '@/components/Timeline';
import { realnessVerify } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Checkbox, ConfigProvider, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
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
      <div className="w-[588px] relative m-auto rounded-[16px] pt-[40px] border border-[#505050]">
        <TimeLine active={1} progress={100} />
        <div className="w-full h-[600px] overflow-y-auto px-8">
          <div className="text-[24px] text-black font-bold mb-4">
            Occupation
          </div>
          <Form
            form={form}
            layout="vertical"
            className="register-form-layout h-auto"
            size="large"
          >
            <Form.Item
              label="Occupation(description)*"
              name="occupationDescription"
              rules={[
                {
                  required: true,
                  message: 'Please describe your professional occupation',
                },
              ]}
            >
              <Input placeholder="Please describe your professional occupation" />
            </Form.Item>
            <Form.Item
              label="Professional status"
              name="professionalStatus"
              rules={[
                {
                  required: true,
                  message: 'Please select ',
                },
              ]}
            >
              <Select placeholder="Please Select">
                <Select.Option value={'Unemployed'}>Unemployed</Select.Option>
                <Select.Option value={'Empoloment'}>Empoloment</Select.Option>
                <Select.Option value={'Self-employed'}>
                  Self-employed
                </Select.Option>
                <Select.Option value={'Startup Founder'}>
                  Startup Founder
                </Select.Option>
                <Select.Option value={'Business Owner'}>
                  Business Owner
                </Select.Option>
                <Select.Option value={'Retired'}>Retired</Select.Option>
                <Select.Option value={'Prefer not to say'}>
                  Prefer not to say
                </Select.Option>
              </Select>
            </Form.Item>
            <div className="text-[24px] mt-[48px] text-black font-bold">
              Confirmstion of Accuracy
            </div>
            <div className="text-[#9EA6BC] mb-6 text-xs leading-[22px]">
              Please carefully review the provided information and confirm
              that it is true, complete and accurate.
            </div>
            <Form.Item
              label="Confirmation"
              name="checked"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: 'Please checked',
                },
              ]}
            >
              <Checkbox>
                <span className="text-xs text-[#5B6276]">
                  I hereby confirm that the information provided by me in this
                  KYC Questionnaire is complete, true, accurate and not
                  misleading.
                </span>
              </Checkbox>
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
    </>
  );
}
