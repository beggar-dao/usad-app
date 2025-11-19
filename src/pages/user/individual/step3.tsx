import { ReactComponent as CheckedSvg } from '@/assets/images/checked.svg';
import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import { ReactComponent as ErrorSvg } from '@/assets/images/error.svg';
import face from '@/assets/images/face.png';
import GradientBorderBox from '@/components/GradientBorderBox';
import TimeLine from '@/components/Timeline';
import { realness } from '@/services/user';
import { history, useModel } from '@umijs/max';
import { Form, Upload } from 'antd';
import { useEffect } from 'react';

export default function Step3() {
  const [form] = Form.useForm();
  const {
    handleUploadChange,
    beforeUpload,
    uploadFile,
    individualData,
    setIndividualData,
  } = useModel('verify');
  const { setAlertInfo } = useModel('dialogState');

  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      await realness({
        ...individualData,
        ...values,
        firstPhotoData_fileList: undefined,
        addressProof_fileList: undefined,
        personalPhotoData_fileList: undefined,
        secondPhotoData_fileList: undefined,
      });
      setIndividualData({});
      setAlertInfo({
        type: 'success',
        message: 'Verification Successful',
        show: true,
      });
      history.push('/user/verification/complete');
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
          <TimeLine active={3} progress={100} />
          <div className="w-full h-[600px] overflow-y-auto px-8">
            <div className="text-[24px] text-white font-bold mb-4">
              FaceMatch ID
            </div>
            <Form
              form={form}
              layout="vertical"
              className="register-form-layout h-auto"
              size="large"
            >
              <Form.Item
                label=""
                name="personalPhotoData"
                rules={[
                  {
                    required: true,
                    message: 'Please Upload!',
                  },
                ]}
              >
                <Upload.Dragger
                  maxCount={1}
                  showUploadList={false}
                  fileList={individualData?.personalPhotoData_fileList || []}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.helc"
                  beforeUpload={beforeUpload}
                  customRequest={uploadFile}
                  onChange={(data) =>
                    handleUploadChange(data, 'personalPhotoData')
                  }
                >
                  <img
                    src={
                      individualData.personalPhotoData
                        ? `data:image/png;base64,${individualData.personalPhotoData}`
                        : face
                    }
                    className="block object-contain m-auto w-full"
                  />
                </Upload.Dragger>
              </Form.Item>
            </Form>

            <div className="mt-4 text-base text-[#F5F7FF] font-[700]">Tips</div>
            <div className="mt-3 flex items-center text-sm text-[#F5F7FF]">
              <CheckedSvg className="mr-2" />
              Find a well lit place
            </div>
            <div className="mt-3 flex items-center text-sm text-[#F5F7FF]">
              <CheckedSvg className="mr-2" />
              Ensure your face is within the frame
            </div>
            <div className="mt-3 flex items-center text-sm text-[#F5F7FF]">
              <ErrorSvg className="mr-2" />
              Don't wear hats, glasses and masks
            </div>
            {/* <div className="text-[#63bcff] mt-3 text-sm leading-[26px]">
            See our guidelines
          </div> */}
          </div>
          <div className="w-full rounded-bl-2xl rounded-br-2xl  h-[104px] px-[40px] gap-[23px] flex items-center justify-between">
            <div
              onClick={handleSubmit}
              className="w-[390px] relative cursor-pointer h-[48px] leading-[48px] text-center text-white font-[500] gold-gradient-bg rounded-lg"
            >
              {!individualData?.personalPhotoData ? (
                <Upload
                  maxCount={1}
                  showUploadList={false}
                  fileList={individualData?.personalPhotoData_fileList || []}
                  accept=".jpg,.jpeg,.png,.gif,.webp,.helc"
                  beforeUpload={beforeUpload}
                  customRequest={uploadFile}
                  onChange={(data) =>
                    handleUploadChange(data, 'personalPhotoData')
                  }
                  className=" z-10 absolute left-0 right-0 w-full h-full"
                >
                  <div className=" z-10 absolute top-0 left-0 right-0 w-full h-full"></div>
                </Upload>
              ) : null}
              {!individualData?.personalPhotoData ? 'Upload Selfie' : 'Submit'}
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
