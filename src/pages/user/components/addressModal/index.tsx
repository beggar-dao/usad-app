import usad from '@/assets/images/usad_coin.png';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Checkbox, Form, Input, Modal, Select, Tooltip } from 'antd';
import { useEffect } from 'react';

export default function AddressModal() {
  const [form] = Form.useForm();
  const {
    addressModal,
    setAddressModal,
    addressObj,
    setAddressObj,
    updateAddress,
  } = useModel('addressWhiteList');
  const { setLoginModel } = useModel('dialogState');

  const onFinish = async () => {
    let values = await form.validateFields();
    if (addressObj.id) {
      updateAddress({
        ...addressObj,
        ...values,
        isSecondaryAuth: values.isSecondaryAuth ? 1 : 0,
      });
    } else {
      setLoginModel(true);
      setAddressObj({
        ...addressObj,
        ...values,
        add: true,
        isSecondaryAuth: values.isSecondaryAuth ? 1 : 0,
      });
    }
  };

  useEffect(() => {
    if (!Object.values(addressObj).length) {
      form.resetFields();
    }
    form.setFieldsValue({
      ...addressObj,
      isSecondaryAuth: addressObj.isSecondaryAuth === 1 ? true : false,
    });
  }, [addressModal, addressObj]);

  return (
    <Modal
      onCancel={() => {
        setAddressModal(false);
      }}
      centered
      maskClosable={false}
      footer={null}
      open={addressModal}
    >
      <div className="px-[16px] py-[15px]">
        <div className="text-[24px] mb-[30px] font-bold text-center text-white">
          {`${!!addressObj.id ? 'Edit' : 'Add an'}`} Address
        </div>
        {!!addressObj.id ? null : (
          <>
            <div className="px-[16px] py-[12px] mb-4 bg-[#ffa6000a] leading-[22px] border-[1px] border-[#ffa6001f] rounded-lg text-[#EE6700] text-sm">
              Note: Once successfully added, your withdrawal/transfer address
              cannot be modified.
            </div>
            <div className="text-sm leading-[22px] text-white mb-3">
              On-chain Transfer
            </div>
          </>
        )}

        <Form form={form} size="large">
          <div className="flex items-center font-bold mb-3 text-[14px]">
            Assets
          </div>

          <div className="register-input flex items-center mb-3">
            <img src={usad} className="w-[22px] h-[22px] mr-3" /> USAD
          </div>

          <Form.Item hidden name="currency" initialValue="USAD"></Form.Item>

          <div className="flex items-center font-bold mb-3 text-[14px]">
            Address
          </div>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Input
              className="register-input"
              disabled={!!addressObj.id}
              placeholder="Please enter the address you would like to whitelist."
            />
          </Form.Item>
          <div className="flex items-center font-bold mb-3 text-[14px]">
            Chain Type
          </div>
          <Form.Item
            name="chainType"
            rules={[
              {
                required: true,
                message: '',
              },
            ]}
          >
            <Select
              placeholder="Please select a chain type"
              style={{ height: '47px' }}
              disabled={!!addressObj.id}
              popupRender={(menu) => (
                <>
                  <div className="px-[16px] py-[12px] m-[16px] bg-[#ffa6000a] leading-[22px] border-[1px] border-[#ffa6001f] rounded-lg text-[#EE6700] text-sm">
                    Note: Once successfully added, your withdrawal/transfer
                    address cannot be modified.
                  </div>
                  {menu}
                </>
              )}
              optionRender={(option) => {
                return (
                  <>
                    <div className="flex items-center justify-between px-[8px]">
                      <div>{option.label}</div>
                      <div>≈{option.data.mins}</div>
                    </div>
                    <div className="flex text-[#81858C] items-center justify-between px-[8px] font-normal">
                      <div>{option.data.name}</div>
                      <div>{option.data.count}</div>
                    </div>
                  </>
                );
              }}
            >
              <Select.Option
                name="Ethereum(ERC20)"
                count={`6 Confirmation/s`}
                mins={`2 mins`}
                value="ETH"
              >
                ETH
              </Select.Option>
              <Select.Option
                name="Tron(ERC20)"
                count={`6 Confirmation/s`}
                mins={`1 mins`}
                value="TRX"
              >
                TRX
              </Select.Option>
              <Select.Option
                name="Solana"
                count={`3 Confirmation/s`}
                mins={`30 sec`}
                value="SOL"
              >
                SOL
              </Select.Option>
            </Select>
          </Form.Item>
          <div className="flex items-center font-bold mb-3 text-[14px]">
            Tag
          </div>
          <Form.Item name="tag">
            <Input placeholder="Optional" className="register-input" />
          </Form.Item>
          <Form.Item name="isSecondaryAuth" valuePropName="checked">
            <Checkbox>
              <div className="flex items-center text-xs">
                No verification needed for this address next time
                <Tooltip
                  title={`If selected, transfer to this address will not require
                    additional verification (2FA/email) in the future.`}
                >
                  <InfoCircleOutlined className="ml-2" />
                </Tooltip>
              </div>
            </Checkbox>
          </Form.Item>
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
