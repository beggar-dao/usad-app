import usad from '@/assets/images/usad_coin.png';
import { useModel } from '@umijs/max';
import { Form, Input, Modal, Radio } from 'antd';
import { useEffect } from 'react';

export default function WithDraw() {
  const [form] = Form.useForm();
  const {
    withDrawModal,
    setting,
    setWithDrawModal,
    handleSettingAddressWhitelistPost,
  } = useModel('addressWhiteList');
  const { setAlertInfo } = useModel('dialogState');
  const { getFieldsValue } = form;
  const formData = getFieldsValue();

  Form.useWatch((values) => values.type, form);

  const onFinish = async () => {
    let values = await form.validateFields();
    handleSettingAddressWhitelistPost({
      ...values,
    });
    setAlertInfo({
      type: 'success',
      message: `Successfully`,
      show: true,
    });
    setWithDrawModal(false);
  };

  useEffect(() => {
    if (!withDrawModal) {
      form.resetFields();
    } else {
      form.setFieldsValue({ type: 0, ...setting });
    }
  }, [withDrawModal]);

  return (
    <Modal
      onCancel={() => {
        setWithDrawModal(false);
      }}
      centered
      maskClosable={false}
      footer={null}
      open={withDrawModal}
    >
      <div className="px-4 py-[15px]">
        <div className="text-[24px] mb-2 font-bold text-center">
          Withdrawal/Transfer Limits
        </div>

        <div className="my-2 text-xs text-[#ADB1B8] leading-5">
          Take control of your account security by setting custom limits for
          crypto withdrawals and transfers.
        </div>
        <Form layout="vertical" form={form} size="large">
          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Radio.Group
              options={[
                { label: 'Fiat Withdrawal ', value: 0 },
                { label: 'Transfer', value: 1 },
              ]}
            />
          </Form.Item>
          {formData.type === 0 ? (
            <>
              <Form.Item
                name="fiatWithdrawalDailyLimit"
                label="Daily amount"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                  {
                    validator: (_, value) => {
                      if (value && parseFloat(value) < 100000) {
                        return Promise.reject(
                          'Minimum amount is 100,000 USAD',
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Please enter daily amount."
                  suffix={
                    <div className=" flex items-center text-sm">
                      <img src={usad} className="w-[22px] h-[22px] mr-3" />{' '}
                      USAD
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                name="fiatWithdrawalMonthlyLimit"
                label="Monthly amount"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                  {
                    validator: (_, value) => {
                      if (value && parseFloat(value) < 100000) {
                        return Promise.reject(
                          'Minimum amount is 100,000 USAD',
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Please enter monthly amount."
                  suffix={
                    <div className=" flex items-center text-sm">
                      <img src={usad} className="w-[22px] h-[22px] mr-3" />{' '}
                      USAD
                    </div>
                  }
                />
              </Form.Item>
            </>
          ) : null}
          {formData.type === 1 ? (
            <>
              <Form.Item
                name="transferDailyLimit"
                label="Daily amount"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input
                  placeholder="Please enter daily amount."
                  suffix={
                    <div className=" flex items-center text-sm">
                      <img src={usad} className="w-[22px] h-[22px] mr-3" />{' '}
                      USAD
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                name="transferMonthlyLimit"
                label="Monthly amount"
                rules={[
                  {
                    required: true,
                    message: '',
                  },
                ]}
              >
                <Input
                  placeholder="Please enter monthly amount."
                  suffix={
                    <div className=" flex items-center text-sm">
                      <img src={usad} className="w-[22px] h-[22px] mr-3" />{' '}
                      USAD
                    </div>
                  }
                />
              </Form.Item>
            </>
          ) : null}
          <div className="text-sm text-[#ADB1B8] leading-6">
            · Limits apply across all crypto assets. <br />· You can update or
            remove limits anytime from your settings. <br />
            · Increasing or removing a limit may require extra verification.
            <br />
          </div>
        </Form>
        <div
          onClick={() => onFinish()}
          className="text-base hover:opacity-80 text-white h-[48px] text-center mt-12 gold-gradient-bg leading-[48px] cursor-pointer rounded-[8px] text-shadow"
        >
          Confirm
        </div>
      </div>
    </Modal>
  );
}
