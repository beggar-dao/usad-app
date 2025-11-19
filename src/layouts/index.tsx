import CustomerAlert from '@/components/CustomerAlert';
import Footer from '@/components/footer';
import Header from '@/components/header';
import SecurityVerification from '@/components/SecurityVerification';
import { Outlet, useLocation, useModel } from '@umijs/max';
import { Flex, Modal, Progress, Spin } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const location = useLocation();
  const { isWeb, check } = useModel('window');
  const { loading } = useModel('global');
  const [sessionModal, setSessionModal] = useState(false);
  const { logout } = useModel('auth');
  const [exit, setExit] = useState(false);
  const isAuth = location.pathname.includes('/Auth/') || location.pathname.includes('/user/');

  const keep = () => {
    setSessionModal(false);
  };

  useEffect(() => {
    check();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setExit(true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const logOut = () => {
    handleLogout();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <CustomerAlert />
      <SecurityVerification
        disabled2fa={location.pathname === '/user/profile'}
        isResetPassword={location.pathname === '/Auth/ResetPassword'}
      />
      <Spin spinning={loading} fullscreen />
      <div id="gbpc-scroll" className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <Modal
        open={sessionModal}
        footer={null}
        centered={true}
        onCancel={() => setSessionModal(false)}
      >
        <div className="pt-6">
          <Flex justify="center">
            {!exit && (
              <Progress
                type="circle"
                percent={30}
                strokeColor={'#63BCFF'}
                trailColor="#D9D9D9"
                size={160}
                format={() => '00:33'}
              />
            )}
            {exit && <img src="/images/out.png" className="w-[120px]" />}
          </Flex>
          <div className="text-[#202B4B] text-[24px] leading-[32px] font-[700] text-center pt-6">
            {exit
              ? 'You have been logged out'
              : 'Your session will expire soon.'}
          </div>
          <div className="text-center text-[#5B6276] font-inter text-[14px] leading-[22px] pt-[16px] pb-[34px]">
            {exit
              ? 'You were automatically logged out due to inactivity as a security measure. Please log in again below'
              : 'Keep your session active or log out to end it now.'}
          </div>
          {!exit && (
            <button
              type="button"
              onClick={keep}
              className="w-full h-[48px] bg-[#202B4B] rounded-[8px] text-[16px] font-[600] font-inter text-[#fff] mb-[34px]"
            >
              Keep the session active
            </button>
          )}
          {!exit && (
            <button
              type="button"
              onClick={logOut}
              className="border border-[rgba(32, 43, 75, 0.12) w-full h-[48px] bg-transparency rounded-[8px] text-[16px] font-[600] font-inter text-[#202B4B] mb-[20px]"
            >
              Log out
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
};
