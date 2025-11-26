import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Checkbox, Drawer, Form, Input, Select, Tooltip } from 'antd';
import { useEffect } from 'react';

export default function AddressBatchModal() {
  const { addressBatchModal, setAddressBatchModal, setAddressObj } =
    useModel('addressWhiteList');
  const { setLoginModel } = useModel('dialogState');
  const [form] = Form.useForm();

  const onFinish = async () => {
    let values = await form.validateFields();
    setLoginModel(true);
    setAddressObj({
      ...values,
      batch: true,
      isSecondaryAuth: values.isSecondaryAuth ? 0 : 1,
    });
  };

  useEffect(() => {
    if (addressBatchModal) {
      form.resetFields();
      form.setFieldsValue({
        whitelists: [{}],
      });
    }
  }, [addressBatchModal]);

  return (
    <Drawer
      title="Add Your Wallet Addresses"
      width={'57%'}
      open={addressBatchModal}
      onClose={() => {
        setAddressBatchModal(false);
      }}
      maskClosable={false}
      destroyOnHidden={true}
      className="!bg-[#111]"
    >
      <Form
        name="dynamic_form_nest_item"
        autoComplete="off"
        form={form}
        size="large"
        layout="vertical"
      >
        <Form.List name="whitelists">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
                <div
                  className="flex  justify-center items-start flex-col"
                  key={key}
                >
                  <div className="text-sm text-white font-[500]">
                    Address {index + 1}
                  </div>
                  <div className="flex mt-3 w-full gap-6 items-center">
                    <div className="flex-1 overflow-hidden">
                      <Form.Item
                        name={[name, 'currency']}
                        label="Assets"
                        className="w-full"
                        rules={[{ required: true, message: '' }]}
                        initialValue="USAD"
                      >
                        <Input readOnly className="w-full" />
                      </Form.Item>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Form.Item
                        name={[name, 'chainType']}
                        label="Chain Type"
                        rules={[{ required: true, message: '' }]}
                        className="w-full"
                      >
                        <Select
                          placeholder="Please select a chain type"
                          popupRender={(menu) => (
                            <>
                              <div className="px-[16px] py-[12px] m-2 bg-[#ffa6000a] leading-[22px] border-[1px] border-[#ffa6001f] rounded-lg text-[#EE6700] text-sm">
                                Note: Once successfully added, your
                                withdrawal/transfer address cannot be modified.
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
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Form.Item
                        name={[name, 'address']}
                        label="Address"
                        className="w-full"
                        rules={[{ required: true, message: '' }]}
                      >
                        <Input
                          className="w-full"
                          placeholder="Please enter the address you would like to whitelist"
                        />
                      </Form.Item>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Form.Item
                        name={[name, 'tag']}
                        label="Tag"
                        className="w-full"
                      >
                        <Input className="w-full" placeholder="Optional" />
                      </Form.Item>
                    </div>
                    {fields.length > 1 ? (
                      <DeleteOutlined
                        className="mt-2"
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
              <Form.Item>
                <div
                  onClick={() => {
                    add();
                  }}
                  className="max-w-[100px] px-4 h-8 leading-8 text-center cursor-pointer text-xs rounded-lg gold-gradient-bg text-white font-bold text-shadow"
                >
                  + Add
                </div>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          className="mt-[45px]"
          name="isSecondaryAuth"
          valuePropName="checked"
        >
          <Checkbox>
            <div className="text-[#666] flex items-center text-xs">
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
        <div
          onClick={onFinish}
          className="max-w-[213px] text-base hover:opacity-80 text-white h-[48px] text-center mt-6 gold-gradient-bg leading-[48px] cursor-pointer rounded-[8px] text-shadow"
        >
          Confirm
        </div>
      </Form>
    </Drawer>
  );
}
