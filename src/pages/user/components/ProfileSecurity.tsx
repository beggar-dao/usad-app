import { ReactComponent as Account1 } from '@/assets/images/account1.svg';
import { ReactComponent as Account2 } from '@/assets/images/account2.svg';
import { ReactComponent as Account3 } from '@/assets/images/account3.svg';
import { ReactComponent as Account4 } from '@/assets/images/account4.svg';
import { ReactComponent as Account5 } from '@/assets/images/account5.svg';
import checked from '@/assets/images/checked.png';
import disabled from '@/assets/images/disabled.png';
import ChangeEmail from '@/components/ChangeEmail';
import ChangePassword from '@/components/ChangePassword';
import { useModel } from '@umijs/max';
import { Button, Switch } from 'antd';

export default function ProfileSecurity({ setActiveKey }: any) {
  const { setPasswordModel, setEmailModel, setLoginModel, setAlertInfo } =
    useModel('dialogState');
  const { user } = useModel('auth');
  const checked2fa = user.is2FA;

  const onChange = async (checked: boolean) => {
    if (!checked) {
      setLoginModel(true);
    }
  };

  return (
    <>
      <ChangeEmail />
      <ChangePassword />
      <div className="mt-[22px]">
        <div className="text-[#ADB1B8] mb-[7px]">Two-Factor Authentication</div>
        <div className="border-b-[#25282C] border-b flex justify-between py-[20px]">
          <div className="flex flex-1 items-center !gap-5">
            <Account1 />{' '}
            <div className="font-bold text-white">Login Password</div>
          </div>
          <div className="flex w-[300px] justify-between items-center ">
            <div className="flex items-center text-sm">
              <img className="block w-6 h-6 mr-2" src={checked} />
            </div>
            <Button
              onClick={() => {
                if (!user.is2FA) {
                  setActiveKey('1');
                  setAlertInfo({
                    type: 'warning',
                    message:
                      'Two-Factor Authentication is required before change password',
                    show: true,
                  });
                  return;
                }
                setPasswordModel(true);
              }}
              variant="solid"
              shape="round"
              className="gold-gradient-bg text-shadow"
            >
              Change
            </Button>
          </div>
        </div>
        <div className="border-b-[#25282C] border-b flex justify-between py-[20px]">
          <div className="flex flex-1 items-center !gap-5">
            <Account2 />{' '}
            <div className="flex-1">
              <div className="font-bold text-white">
                Email Authentication
              </div>
              <div className="text-sm text-[#71757A] font-[300]">
                For Login,withdraw, password retrieval, security settings change
                and API management verification.Unlink
              </div>
            </div>
          </div>
          <div className="flex w-[300px] justify-between items-center ">
            <div className="flex items-center text-sm">
              <img className="block w-6 h-6 mr-2" src={checked} />{' '}
              {`${(user.email || '').split('@')[0].slice(0, 3)}**@***`}
            </div>
            <Button
              onClick={() => {
                if (!user.is2FA) {
                  setActiveKey('1');
                  setAlertInfo({
                    type: 'warning',
                    message:
                      'Two-Factor Authentication is required before change password',
                    show: true,
                  });
                  return;
                }
                setEmailModel(true);
              }}
              variant="solid"
              shape="round"
              className="gold-gradient-bg text-shadow"
            >
              Change Email
            </Button>
          </div>
        </div>
        <div className="border-b-[#25282C] border-b flex justify-between py-[20px]">
          <div className="flex flex-1 items-center !gap-5">
            <Account3 />{' '}
            <div className="flex-1">
              <div className="font-bold text-white">
                Google Two Factor Authentication
              </div>
              <div className="text-sm text-[#71757A] font-[300]">
                For login,withdrawal, password reset, change of security
                settings, and API management verification
              </div>
            </div>
          </div>
          <div className="flex w-[300px] justify-between items-center ">
            <div className="flex items-center text-sm">
              <img
                className="block w-6 h-6 mr-2"
                src={checked2fa ? checked : disabled}
              />{' '}
              {checked2fa ? 'Enabled' : 'Disabled'}
            </div>

            <Switch
              className="switch2fa"
              checked={checked2fa}
              onChange={onChange}
            />
          </div>
        </div>

        {/* <div className="text-[#ADB1B8] mt-[22px] mb-[7px]">
          Account Activities
        </div>
        <div className="border-b-[#25282C] border-b flex justify-between py-[20px]">
          <div className="flex items-center !gap-5">
            <Account4 />{' '}
            <div>
              <div className="font-bold text-white">
                Trusted Devices Management{' '}
              </div>
              <div className="text-sm text-[#71757A] font-[300]">
                You have 7 trusted devices logged in
              </div>
            </div>
          </div>
          <div className="flex items-center gap-9">
            <Button variant="solid" shape="round" className="gold-gradient-bg text-shadow">Management</Button>
          </div>
        </div>
        <div className="border-b-[#25282C] border-b-0 flex justify-between py-[20px]">
          <div className="flex items-center !gap-5">
            <Account5 />{' '}
            <div>
              <div className="font-bold text-white">
                Account Activities{' '}
              </div>
              <div className="text-sm text-[#71757A] font-[300]">
                Account abnormal?{' '}
                <span className="text-[#C69F58] cursor-pointer">Deactivate an Account</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-9">
            <Button variant="solid" shape="round" className="gold-gradient-bg text-shadow">View</Button>
          </div>
        </div> */}
      </div>
    </>
  );
}
