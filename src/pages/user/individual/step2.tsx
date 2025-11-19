import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import step2_1 from '@/assets/images/step2_1.png';
import step2_2 from '@/assets/images/step2_2.png';
import step2_3 from '@/assets/images/step2_3.png';
import GradientBorderBox from '@/components/GradientBorderBox';
import TimeLine from '@/components/Timeline';
import { realnessVerify } from '@/services/user';
import { CloudUploadOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Form, Radio, Select, Upload } from 'antd';
import { Country } from 'country-state-city';
import { useEffect } from 'react';
export default function Step1_1() {
  const [form] = Form.useForm();
  const {
    handleUploadChange,
    beforeUpload,
    uploadFile,
    individualData,
    setIndividualData,
  } = useModel('verify');

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
      history.push('/user/verification/individual/step3');
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      ...individualData,
    });
  }, [individualData]);

  // 监听证件类型变化
  const certificateType = Form.useWatch('certificateType', form);
  useEffect(() => {
    console.log('certificateType', certificateType);
    if (certificateType !== undefined) {
      setIndividualData((prev) => ({
        ...prev,
        ...(form.getFieldsValue() || {}),
        certificateType,
        firstPhotoData: undefined,
        firstPhotoData_fileList: undefined,
        secondPhotoData: undefined,
        secondPhotoData_fileList: undefined,
      }));
    }
  }, [certificateType]);

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
          <TimeLine active={2} progress={100} />
          <div className="w-full h-[600px] overflow-y-auto px-8">
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
                label="Select the country that issued your document"
                name="certificateCountry"
                rules={[
                  {
                    required: true,
                    message: 'Please select ',
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
                label="Choose your document type"
                name="certificateType"
                rules={[
                  {
                    required: true,
                    message: 'Please checked ',
                  },
                ]}
              >
                <Radio.Group
                  className="verify-radio"
                  options={[
                    {
                      label: 'Passport',
                      value: 0,
                    },
                    {
                      label: `Driver's license`,
                      value: 1,
                    },
                    {
                      label: 'ID Card',
                      value: 2,
                    },
                  ]}
                />
              </Form.Item>
              <div className="text-[14px] leading-6 text-[#666]">
                Take a photo of your ID card. The photo should be:
              </div>
              <div className="!mt-5 text-sm text-[#666] leading-6">
                <span className="text-[#ADB1B8]">· bright and clear </span>(good
                quality)
                <br /> <span className="text-[#ADB1B8]">· uncut</span> (all
                corners of the document should be visible)
              </div>
              <div className="flex items-center gap-[30px] !mt-5">
                <img src={step2_1} className="block w-[120px]" />
                <img src={step2_2} className="block w-[120px]" />
                <img src={step2_3} className="block w-[120px]" />
              </div>
              <div className="flex items-center gap-[18px] !mt-5">
                <Form.Item
                  label=""
                  name="firstPhotoData"
                  className="flex-1"
                  rules={[
                    {
                      required: true,
                      message: 'Please Upload ',
                    },
                  ]}
                >
                  <Upload.Dragger
                    maxCount={1}
                    fileList={individualData?.firstPhotoData_fileList || []}
                    accept=".jpg,.jpeg,.png,.gif,.webp,.helc"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    customRequest={uploadFile}
                    onChange={(data) =>
                      handleUploadChange(data, 'firstPhotoData')
                    }
                    className="bg-[#1E1D1A]"
                  >
                    {individualData?.firstPhotoData ? (
                      <img
                        src={`data:image/png;base64,${individualData.firstPhotoData}`}
                        className="w-full"
                      />
                    ) : (
                      <>
                        <p className="text-[#ADB1B8] text-[40px]">
                          <CloudUploadOutlined />
                        </p>
                        <p className="text-center text-sm text-[#ADB1B8]">
                          Upload the{' '}
                          <span className="text-[#DEC08B]">front</span> of your
                          document
                        </p>
                      </>
                    )}
                  </Upload.Dragger>
                </Form.Item>
                {form.getFieldValue('certificateType') !== 0 ? (
                  <Form.Item
                    label=""
                    className="flex-1"
                    name="secondPhotoData"
                    rules={[
                      {
                        required: true,
                        message: 'Please Upload ',
                      },
                    ]}
                  >
                    <Upload.Dragger
                      maxCount={1}
                      fileList={individualData?.secondPhotoData_fileList || []}
                      showUploadList={false}
                      accept=".jpg,.jpeg,.png,.gif,.webp,.helc"
                      beforeUpload={beforeUpload}
                      customRequest={uploadFile}
                      className="bg-[#1E1D1A]"
                      onChange={(data) =>
                        handleUploadChange(data, 'secondPhotoData')
                      }
                    >
                      {individualData?.secondPhotoData ? (
                        <img
                          src={`data:image/png;base64,${individualData.secondPhotoData}`}
                          className="w-full"
                        />
                      ) : (
                        <>
                          <p className="text-[#ADB1B8] text-[40px]">
                            <CloudUploadOutlined />
                          </p>
                          <p className="text-center text-sm text-[#ADB1B8]">
                            Upload the{' '}
                            <span className="text-[#DEC08B]">Back</span> of your
                            document
                          </p>
                        </>
                      )}
                    </Upload.Dragger>
                  </Form.Item>
                ) : null}
              </div>
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
