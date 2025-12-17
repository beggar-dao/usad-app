import GradientBorderBox from '@/components/GradientBorderBox';
import Menu, { MobileMenu } from '@/components/Menu';
import { cn } from '@/utils/cn';
import { history, Outlet, useModel, useSearchParams } from '@umijs/max';
import { useResponsive } from 'ahooks';
import { useEffect } from 'react';

export default function UserIndex() {
  const { user } = useModel('auth');
  const { init } = useModel('verify');
  const { sm: isWeb } = useResponsive();
  const [searchParams] = useSearchParams();
  const isNotLogin =
    !user.id && !searchParams.get('code') && !searchParams.get('id');

  useEffect(() => {
    init();
    return () => {
      sessionStorage.removeItem('activeKey');
    };
  }, []);

  if (isNotLogin) {
    history.push('/auth/login');
    return;
  }

  return (
    <>
      {isWeb ? (
        <div className="absolute">
          <Menu />
        </div>
      ) : (
        <MobileMenu />
      )}
      <GradientBorderBox className="m-auto sm:m-[34px] sm:left-[256px] sm:w-[calc(100%-320px)]">
        <div
          className={cn(
            'p-4 sm:p-8 rounded relative z-10',
            isWeb ? 'black-gradient-bg2' : '',
          )}
        >
          <Outlet />
        </div>
      </GradientBorderBox>
    </>
  );
}
