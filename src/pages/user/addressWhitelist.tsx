import checked from '@/assets/images/checked.png';
import disabled from '@/assets/images/disabled.png';
import ConfirmModal from '@/components/ConfirmModal';
import No2fa from '@/components/No2fa';
import { InfoCircleOutlined, LockOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Pagination,
  Select,
  Switch,
  Tooltip,
} from 'antd';
import { useEffect, useState } from 'react';
import AddressBatchModal from './components/addressBatchModal';
import AddressModal from './components/addressModal';
import WithDraw from './components/withdraw/add';

let timeout: any = null;

export default function AddressWhitelist() {
  const { user } = useModel('auth');
  const [form] = Form.useForm();
  const { verifi, corporate } = useModel('verify');
  const {
    setWithDrawModal,
    setAddressBatchModal,
    setAddressModal,
    getAddress,
    addressList,
    setAddressObj,
    handleSettingAddressWhitelist,
    handleSettingAddressWhitelistPost,
    setting,
    page,
  } = useModel('addressWhiteList');
  const { setConfirmModal } = useModel('global');
  const [checkedSwitch, setCheckedSwitch] = useState(
    !!setting.newAddressTransferLock,
  );
  const { setLoginModel } = useModel('dialogState');

  const onChange = async (checked: boolean) => {
    if (checked) {
      setCheckedSwitch(checked);
      handleSettingAddressWhitelistPost({
        newAddressTransferLock: checked ? 1 : 0,
      });
    } else {
      setLoginModel(true);
      setAddressObj({
        setting: true,
      });
    }
  };

  useEffect(() => {
    setCheckedSwitch(!!setting.newAddressTransferLock);
  }, [setting.newAddressTransferLock]);

  const onChangeAddress = (e: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      getAddress({
        ...form.getFieldsValue(),
        address: e.target.value,
        pageNumber: 1,
      });
    }, 500);
  };

  useEffect(() => {
    handleSettingAddressWhitelist();
    getAddress();
  }, []);

  if (verifi?.status !== 2 && corporate?.status !== 2) {
    return (
      <No2fa title="KYC/KYB verification required">
        <div>
          this page is available only to users who have completed <br /> KYC/KYB
          verification. Please complete the{' '}
          <span className="text-[#5B6276] font-bold">Verification</span> <br />
          process to gain access.
        </div>
      </No2fa>
    );
  }

  return (
    <>
      {user.is2FA ? (
        <>
          <AddressBatchModal />
          <WithDraw />
          <AddressModal />
          <ConfirmModal
            content="Are you sure you want to delete this wallet address?"
            confirm={() => {
              setLoginModel(true);
            }}
          />
          <div className=" pb-6 text-[24px] font-bold text-white">
            Address Whitelist
          </div>
          <div className="text-sm text-[#ADB1B8] leading-[26px] flex items-center">
            Transfers are unavailable for newly saved addresses for 24 hours
            <Tooltip
              title={`For your security, any newly added address will be locked for 24 hours before it becomes active. This precaution helps protect your account from unauthorized activity. Deposits can still be made.`}
            >
              <InfoCircleOutlined className="w-4 h-4 ml-1" />
            </Tooltip>
          </div>
          <div className="!mt-5 flex items-start justify-between">
            <Form
              form={form}
              className="register-form-layout"
              size="large"
              layout="vertical"
            >
              <div className="flex gap-[40px]">
                <Form.Item name={'chainType'} label={'Chain Type'}>
                  <Select
                    className="no-border-select"
                    placeholder="Please select a chain type"
                    allowClear
                    style={{ width: '260px', height: '47px' }}
                    onChange={(value) => {
                      getAddress({
                        ...form.getFieldsValue(),
                        chainType: value,
                        pageNumber: 1,
                      });
                    }}
                    popupRender={(menu) => menu}
                    optionRender={(option) => {
                      return (
                        <>
                          <div className="flex items-center justify-between">
                            <div>{option.label}</div>
                            <div>≈{option.data.mins}</div>
                          </div>
                          <div className="flex text-[#81858C] items-center justify-between font-normal">
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
                <Form.Item name={'address'} label={'Search Address'}>
                  <Input
                    onChange={onChangeAddress}
                    className="w-[260px] register-input"
                    placeholder="Enter the address or add a n..."
                  />
                </Form.Item>
              </div>
            </Form>
            <div className="flex gap-4">
              <div
                onClick={() => {
                  setAddressObj({});
                  setAddressModal(true);
                }}
                className="px-4 h-8 leading-8 text-center cursor-pointer text-xs rounded-lg gold-gradient-bg text-white font-bold text-shadow"
              >
                +Add
              </div>
              <div
                onClick={() => {
                  setAddressBatchModal(true);
                }}
                className="text-xs h-8 leading-8 text-center cursor-pointer px-4 border border-[#4D4D4D] rounded-md font-bold"
              >
                Add in Batches
              </div>
            </div>
          </div>
          <div className="border mt-3 border-[#505050] rounded-lg  overflow-hidden">
            <div className="px-6 h-10 text-sm items-center grid grid-cols-[1fr_1fr_2fr_5fr_1.5fr] black-gradient-bg1 text-white leading-6">
              <div>Assets</div>
              <div>Network</div>
              <div>Tag</div>
              <div>Wallet address</div>
              <div>Action</div>
            </div>
            {addressList.map((item: any, index) => {
              return (
                <div
                  key={index}
                  className="px-6 min-h-[50px] text-xs items-center grid grid-cols-[1fr_1fr_2fr_5fr_1.5fr] text-[#ADB1B8] leading-6"
                >
                  <div className="w-full">{item.currency}</div>
                  <div className="w-full">{item.chainType}</div>
                  <div className="w-full break-all">{item.tag}</div>
                  <div className="w-full break-all flex items-center flex-wrap">
                    {item.status === 1 ? (
                      <span className="px-2 mr-1 rounded h-[26px] inline-block text-[#6ECE82] bg-[#6ECE821F] leading-[26px]">
                        Verified
                      </span>
                    ) : (
                      <div className="bg-[#F2503E1F] mr-1 h-[26px] flex items-center rounded text-center text-[#F2503E] px-3">
                        <LockOutlined className="w-4 mr-1" /> 24h
                      </div>
                    )}

                    {item.address}
                  </div>
                  <div className="w-full cursor-pointer">
                    <span
                      onClick={() => {
                        setAddressModal(true);
                        setAddressObj(item);
                      }}
                    >
                      Edit
                    </span>
                    <span
                      onClick={() => {
                        setConfirmModal(true);
                        setAddressObj({
                          ...item,
                          delete: true,
                        });
                      }}
                      className="text-[#FF2121] inline-block ml-6"
                    >
                      Delete
                    </span>
                  </div>
                </div>
              );
            })}
            {addressList.length === 0 && (
              <div className="px-6 text-center h-[120px] flex justify-center text-sm items-center  text-[#ADB1B8] leading-6">
                No data
              </div>
            )}
          </div>

          {page.totalCount > 5 ? (
            <div className="flex items-center justify-center mt-[20px]">
              <ConfigProvider
                theme={{
                  components: {
                    Pagination: {
                      colorPrimary: '#202B4B',
                      colorPrimaryHover: '#202B4B',
                      /* 这里是你的组件 token */
                    },
                  },
                }}
              >
                <Pagination
                  current={page.currentPage || 1}
                  pageSize={5}
                  showSizeChanger={false}
                  total={page.totalCount || 0}
                  onChange={(page) => {
                    getAddress({
                      pageNumber: page,
                    });
                  }}
                />
              </ConfigProvider>
            </div>
          ) : null}

          <div className="text-white text-base mt-[36px] mb-2 text-[#ADB1B8]">
            Withdrawal/Transfer Security
          </div>

          <div className="border-b-[#25282C] border-b flex justify-between py-[20px]">
            <div className="flex flex-1 items-center !gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle cx="24" cy="24" r="24" fill="#191919" />
                <path
                  d="M23.7781 25.3315C21.6948 25.3315 20 23.6869 20 21.6656C20 19.6444 21.6948 18 23.7781 18C25.8615 18 27.5563 19.6446 27.5563 21.6659C27.5563 23.6871 25.8615 25.3315 23.7781 25.3315ZM23.7781 19.2938C22.43 19.2938 21.3334 20.358 21.3334 21.6656C21.3334 22.9732 22.43 24.0377 23.7781 24.0377C25.1263 24.0377 26.2229 22.9734 26.2229 21.6659C26.2229 20.3583 25.1263 19.2938 23.7781 19.2938Z"
                  fill="#BBBBBB"
                />
                <path
                  d="M23.6677 34.2699C23.5387 34.2699 23.4098 34.2336 23.2976 34.1612C22.9587 33.9418 15 28.7195 15 22.4098C15 17.7727 18.8883 14 23.6677 14C28.447 14 32.3353 17.773 32.3353 22.4101C32.3353 28.6416 24.3799 33.9364 24.0412 34.1588C23.9285 34.2329 23.7982 34.2699 23.6677 34.2699ZM23.6677 15.294C19.6235 15.294 16.3334 18.4864 16.3334 22.4098C16.3334 27.3024 22.1236 31.7352 23.6653 32.828C25.2052 31.7234 31.002 27.2413 31.002 22.4098C31.002 18.4864 27.7118 15.294 23.6677 15.294Z"
                  fill="#BBBBBB"
                />
              </svg>
              <div className="flex-1">
                <div className="text-white font-bold">
                  New Address Transfer 24h Lock
                </div>
                <div className="text-sm text-[#71757A] font-[300]">
                  Once enabled
                </div>
              </div>
            </div>
            <div className="flex w-[300px] justify-between items-center ">
              {setting.newAddressTransferLockStatus === 0 ? (
                <div className="bg-[#F2503E1F] h-[26px] text-sm flex items-center rounded text-center text-[#F2503E] px-2">
                  <LockOutlined className="w-4 mr-1" /> 24h
                </div>
              ) : null}

              <div className="flex items-center text-sm text-white">
                <img
                  className="block w-6 h-6 mr-2"
                  src={checkedSwitch ? checked : disabled}
                />
                {checkedSwitch ? (
                  'Enabled'
                ) : (
                  <span className="text-[#FF2121]">Disabled</span>
                )}
              </div>

              <Switch
                className="switch2fa"
                checked={checkedSwitch}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="flex justify-between py-[20px]">
            <div className="flex flex-1 items-center !gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle cx="24" cy="24" r="24" fill="#191919" />
                <path
                  d="M21.5 17.5C22.647 16.7354 24.47 14.9768 26.3123 13.3866C27.2012 12.6195 28.5425 12.8526 29.1729 13.8431L31.5 17.5"
                  stroke="black"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <rect
                  x="13.6"
                  y="17.6"
                  width="21.8"
                  height="16.8"
                  rx="3.4"
                  stroke="#BBBBBB"
                  strokeWidth="1.2"
                />
                <path
                  d="M28 21.5996H35.4004V30.4004H28C26.1222 30.4004 24.5996 28.8778 24.5996 27V25C24.5996 23.1222 26.1222 21.5996 28 21.5996Z"
                  stroke="#BBBBBB"
                  strokeWidth="1.2"
                />
                <circle cx="28" cy="26" r="1" fill="#BBBBBB" />
              </svg>
              <div className="flex-1">
                <div className="text-white font-bold">
                  Manage Crypto Withdrawal/Transfer Limits
                </div>
                <div className="text-sm text-[#71757A] font-[300]">
                  Once enabled
                </div>
              </div>
            </div>
            <div className="flex w-[300px] justify-between items-center ">
              <Button
                onClick={() => {
                  setWithDrawModal(true);
                }}
                variant="solid"
              >
                Setting
              </Button>
            </div>
          </div>
        </>
      ) : (
        <No2fa />
      )}
    </>
  );
}
