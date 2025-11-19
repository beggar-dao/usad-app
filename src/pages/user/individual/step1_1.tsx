import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import GradientBorderBox from '@/components/GradientBorderBox';
import TimeLine from '@/components/Timeline';
import { realnessVerify } from '@/services/user';
import { CloudUploadOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Form, Image, Input, Select, Upload } from 'antd';
import { Country, State } from 'country-state-city';
import { useEffect, useState } from 'react';

export default function Step1_1() {
  const [form] = Form.useForm();
  const [imageError, setImageError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [availableStates, setAvailableStates] = useState<any[]>([]);
  const {
    beforeUpload,
    uploadFile,
    handleUploadChange,
    individualData,
    setIndividualData,
  } = useModel('verify');

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

  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      let res = await realnessVerify({
        ...individualData,
        ...values,
        addressProof_fileList: undefined,
      });
      setIndividualData({
        ...individualData,
        ...values,
        ...res.data,
      });
      history.push('/user/verification/individual/step1_2');
    });
  };

  const watch = Form.useWatch(null, form);

  useEffect(() => {
    setIndividualData({
      ...individualData,
      ...watch,
    });
  }, []);

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
          <TimeLine active={1} progress={50} />
          <div className="w-full h-[600px] overflow-y-auto px-8">
            <div className="text-[24px] text-white font-bold mb-4">Address</div>
            <Form
              form={form}
              layout="vertical"
              className="register-form-layout h-auto"
              size="large"
            >
              <Form.Item
                label="Country"
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
                  onChange={handleCountryChange}
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
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your city!',
                  },
                ]}
              >
                <Input className="register-input" placeholder="Your City" />
              </Form.Item>
              <Form.Item
                label="Street, house number, apartment"
                name="street"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message:
                      'Please enter your Street, house number, apartment!',
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Your Street, house number, apartment"
                  className="register-input"
                />
              </Form.Item>
              <Form.Item
                label="Postal code"
                name="postcode"
                style={{ flex: 1 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Postal code!',
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Your Postal code"
                  className="register-input"
                />
              </Form.Item>
              <Form.Item
                label="Residence permit/Proof of Address"
                required={true}
                rules={[
                  {
                    required: true,
                    message: 'Please upload',
                  },
                ]}
                name="addressProof"
              >
                <div>
                  <div className="text-sm mb-3 font-[200] text-[#A1A8C0] leading-[22px]">
                    If you are a citizen of the Russian Federation,pleaseupload
                    your residence permit and a proof of address now or sentthem
                    to{' '}
                    <span className="text-[#6ECE82]">sup.usad@gmail.com</span>
                  </div>
                  <Upload.Dragger
                    maxCount={1}
                    fileList={
                      (individualData as any)?.addressProof_fileList || []
                    }
                    showUploadList={false}
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.helc"
                    beforeUpload={(file) => {
                      beforeUpload(file);
                    }}
                    customRequest={uploadFile}
                    onChange={(data) => {
                      setImageError(false);
                      handleUploadChange(data, 'addressProof');
                    }}
                  >
                    {individualData.addressProof ? (
                      <>
                        {(individualData?.addressProof_fileList &&
                          individualData?.addressProof_fileList[0].type ===
                          'application/pdf') ||
                          imageError ? (
                          <embed
                            type="application/pdf"
                            src={`data:application/pdf;base64,${individualData.addressProof}`}
                            width="100%"
                            height={300}
                          />
                        ) : (
                          <Image
                            src={`data:image/png;base64,${individualData.addressProof}`}
                            className="w-full"
                            preview={false}
                            onError={() => setImageError(true)}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-[#202B4B] text-[40px]">
                          <CloudUploadOutlined />
                        </p>
                        <p className="text-center text-sm">
                          Upload file <br />{' '}
                          <span className="text-[#6ECE82]">Choose</span> or drag
                          and drop
                        </p>
                        <p className="mt-3 text-[#9ea6bc] text-xs">
                          JPG, PNG, HEIC, WEBP or PDF (max 50 MB)
                        </p>
                      </>
                    )}
                  </Upload.Dragger>
                </div>
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
