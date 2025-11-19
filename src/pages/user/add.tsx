import { useModel } from '@umijs/max';
import { ConfigProvider, Form, Input, Modal, Radio } from 'antd';
import { useEffect } from 'react';

export default function AddUbo({ data }: any) {
  const [form] = Form.useForm();
  const { uboModal, setUboModal, handleCreateUbo } = useModel('verify');
  const roles = Form.useWatch((values) => values.type, form);
  const { setAlertInfo } = useModel('dialogState');

  const onFinish = async () => {
    let values = await form.validateFields();
    await handleCreateUbo({
      id: data.id,
      ...values,
    });
    setAlertInfo({
      type: 'success',
      message: `${roles === 0 ? 'UBO' : 'Representative'} created successfully`,
      show: true,
    });
    setUboModal(false);
  };

  useEffect(() => {
    if (!uboModal) {
      form.resetFields();
    } else {
      form.setFieldsValue(data);
    }
  }, [uboModal]);

  return (
    <Modal
      onCancel={() => {
        setUboModal(false);
      }}
      centered
      maskClosable={false}
      footer={null}
      open={uboModal}
    >
      <div className="px-4 py-[15px]">
        <div className="text-[24px] mb-2 font-bold text-center">
          Add {roles === 0 ? 'UBO' : 'Representative'}
        </div>
        <div className="text-center !mb-5 text-xs leading-5 text-[#666]">
          Provide information about the individual
        </div>
        <div className="text-[14px] font-bold text-[#ADB1B8] leading-[26px]">
          Select roles
        </div>
        <div className="my-2 text-xs text-[#ADB1B8] leading-5">
          If this beneficiary has several roles, you can fill out a
          questionnaire for them automatically
        </div>
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                colorBorder: '#5B6276',
                radioSize: 20,
                dotSize: 6,
                colorPrimary: '#5B6276',
              },
            },
          }}
        >
          <Form
            initialValues={{ type: data.type || 0 }}
            layout="vertical"
            form={form}
            size="large"
          >
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please Select roles',
                },
              ]}
            >
              <Radio.Group
                className="verify-radio"
                options={[
                  { label: 'UBO', value: 0 },
                  { label: 'Representative', value: 1 },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter first name.',
                },
              ]}
            >
              <Input placeholder="Please enter first name." />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter last name.',
                },
              ]}
            >
              <Input placeholder="Please enter last name." />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please enter a new email.',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email address.',
                },
              ]}
            >
              <Input placeholder="Please enter email." />
            </Form.Item>
          </Form>
          <div
            onClick={() => onFinish()}
            className="text-base hover:opacity-80 text-white h-[48px] text-center mt-12 gold-gradient-bg leading-[48px] cursor-pointer rounded-[8px] text-shadow"
          >
            Create beneficiary
          </div>
        </ConfigProvider>
      </div>
    </Modal>
  );
}
