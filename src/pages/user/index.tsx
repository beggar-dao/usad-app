import GradientBorderBox from '@/components/GradientBorderBox';
import Menu from '@/components/Menu';
import {
  history,
  Outlet,
  useModel,
  useSearchParams,
} from '@umijs/max';
import { useEffect } from 'react';

export default function UserIndex() {
  const { user } = useModel('auth');
  const { init } = useModel('verify');
  const [searchParams] = useSearchParams();
  const isNotLogin = !user.id && !searchParams.get('code') && !searchParams.get('id')

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
      <div className="absolute">
        <Menu />
      </div>
      <GradientBorderBox className="m-[34px] left-[256px] w-[calc(100%-320px)]">
        <div className="p-8 rounded black-gradient-bg2 relative z-10">
          <Outlet />
        </div>
      </GradientBorderBox>
    </>
  );
}
