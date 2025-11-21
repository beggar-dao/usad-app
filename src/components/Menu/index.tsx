import GradientBorderBox from '@/components/GradientBorderBox';
import {
  AccountIcon,
  AddressIcon,
  LogoutIcon,
  PaymentIcon,
  TimeIcon,
  UsadIcon,
  VerificationIcon,
  WalletIcon,
} from '@/components/Icons';
import { cn } from '@/utils/cn';
import { history, useModel } from '@umijs/max';

interface MenuItem {
  name: string;
  url: string;
  icon?: React.ReactNode;
  checked: boolean;
  onClick: () => void;
}

export default function Menu() {
  const { logout } = useModel('auth');

  const meunList: MenuItem[] = [
    {
      name: 'Account',
      url: '/user/profile',
      icon: <AccountIcon isActive={location.pathname === '/user/profile'} />,
      checked: location.pathname === '/user/profile',
      onClick: () => {
        history.push('/user/profile');
      },
    },
    {
      name: 'Wallet',
      url: '/user/Wallet',
      icon: <WalletIcon isActive={location.pathname === '/user/wallet'} />,
      checked: location.pathname === '/user/wallet',
      onClick: () => {
        history.push('/user/wallet');
      },
    },
    {
      name: 'Verification',
      url: '/user/verification',
      icon: (
        <VerificationIcon
          isActive={location.pathname === '/user/verification'}
        />
      ),
      checked: location.pathname.includes('/user/verification'),
      onClick: () => {
        history.push('/user/verification');
      },
    },
    {
      name: 'Payment',
      url: '/user/payment',
      icon: <PaymentIcon isActive={location.pathname === '/user/payment'} />,
      onClick: () => {
        history.push('/user/payment');
      },
      checked: location.pathname.includes('/user/payment'),
    },
    {
      name: 'Address Whitelist',
      url: '/user/addressWhitelist',
      icon: (
        <AddressIcon
          isActive={location.pathname === '/user/addressWhitelist'}
        />
      ),
      checked: location.pathname === '/user/addressWhitelist',
      onClick: () => {
        history.push('/user/addressWhitelist');
      },
    },
    {
      name: 'USAD',
      url: '/user/usad',
      icon: <UsadIcon isActive={location.pathname === '/user/usad'} />,
      checked: location.pathname.includes('/user/usad'),
      onClick: () => {
        history.push('/user/usad');
      },
    },
    {
      name: 'History',
      url: '/user/history',
      icon: <TimeIcon isActive={location.pathname === '/user/history'} />,
      onClick: () => {
        history.push('/user/history');
      },
      checked: location.pathname === '/user/history',
    },
    {
      name: 'Logout',
      url: '/user/logout',
      icon: <LogoutIcon isActive={location.pathname === '/user/logout'} />,
      checked: location.pathname === '/user/logout',
      onClick: () => {
        logout();
      },
    },
  ];

  return (
    <div className="w-[256px] h-screen py-[34px] bg-[#05060F] border-r-[1px] border-[#272831]">
      <div className="px-6 pb-6 text-xs font-bold text-[#969696]">
        MAIN MENU
      </div>
      <div className="px-6">
        {meunList.map((item: any, index) => {
          return (
            <GradientBorderBox
              key={index}
              onClick={() => item?.onClick()}
              className="my-1 cursor-pointer rounded-[8px] border border-transparent hover:border hover:border-[#505050] hover:black-gradient-bg1"
              gradientClassName={cn("rounded-[8px]", item.checked ? 'opacity-100' : 'opacity-0')}
            >
              <div
                className={cn(
                  'w-[205px] h-[50px] text-[#666] rounded-[8px] relative z-10 flex items-center gap-3 px-5',
                  item.checked
                    ? 'black-gradient-bg1'
                    : '',
                )}
              >
                {item.icon}
                <span className={item.checked ? 'gold-gradient-text' : ''}>
                  {item.name}
                </span>
              </div>
            </GradientBorderBox>
          );
        })}
      </div>
    </div>
  );
}
