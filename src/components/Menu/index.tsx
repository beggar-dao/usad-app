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
import { history, useLocation, useModel, useSearchParams } from '@umijs/max';
import { Tabs } from 'antd';
import { useMemo } from 'react';

interface MenuItem {
  name: string;
  url: string;
  icon?: React.ReactNode;
  checked: boolean;
  onClick: () => void;
}

function useMenuList(): MenuItem[] {
  const { logout } = useModel('auth');
  const { user } = useModel('auth');
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isNotLogin =
    !user.id && !searchParams.get('code') && !searchParams.get('id');

  return useMemo(() => {
    const menuList: MenuItem[] = [
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
        checked: location.pathname.includes('/user/payment'),
        onClick: () => {
          history.push('/user/payment');
        },
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
        checked: location.pathname === '/user/history',
        onClick: () => {
          history.push('/user/history');
        },
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

    if (isNotLogin) {
      return menuList.filter((item) => item.name !== 'Logout');
    }

    return menuList;
  }, [location.pathname, logout, isNotLogin]);
}

export default function Menu() {
  const menuList = useMenuList();

  return (
    <div className="w-[256px] h-screen py-[34px] bg-[#05060F] border-r-[1px] border-[#272831]">
      <div className="px-6 pb-6 text-xs font-bold text-[#969696]">
        MAIN MENU
      </div>
      <div className="px-6">
        {menuList.map((item: MenuItem, index) => {
          return (
            <GradientBorderBox
              key={index}
              onClick={() => item?.onClick()}
              className="my-1 cursor-pointer rounded-[8px] border border-transparent hover:border hover:border-[#505050] hover:black-gradient-bg1"
              gradientClassName={cn(
                'rounded-[8px]',
                item.checked ? 'opacity-100' : 'opacity-0',
              )}
            >
              <div
                className={cn(
                  'w-[205px] h-[50px] text-[#666] rounded-[8px] relative z-10 flex items-center gap-3 px-5',
                  item.checked ? 'black-gradient-bg1' : '',
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

export function MobileMenu() {
  const menuList = useMenuList();
  const activeKey =
    menuList.find((item) => item.checked)?.url ?? menuList[0]?.url ?? '';

  const items = menuList.map((item) => ({
    key: item.url,
    label: (
      <div
        className={cn(
          'flex flex-col items-center gap-1 text-xs font-medium',
          item.checked ? 'text-white' : 'text-[#9E9E9E]',
        )}
      >
        <span>{item.name}</span>
      </div>
    ),
    children: null,
  }));

  const handleChange = (key: string) => {
    const target = menuList.find((item) => item.url === key);
    target?.onClick?.();
  };

  if (!activeKey) {
    return null;
  }

  return (
    <div className="mobile-menu-container w-full px-4 pt-4 pb-1 bg-[#05060F]">
      <Tabs
        className="mobile-menu-tabs"
        activeKey={activeKey}
        onChange={handleChange}
        tabBarGutter={12}
        animated={false}
        items={items}
        tabBarStyle={{ margin: 0 }}
      />
    </div>
  );
}
