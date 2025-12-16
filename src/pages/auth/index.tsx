import Menu from '@/components/Menu';
import { Outlet } from '@umijs/max';

export default function Auth() {
  return (
    <>
      <div className="hidden sm:block absolute">
        <Menu />
      </div>
      <div className="relative m-auto sm:m-[34px] sm:left-[256px] sm:w-[calc(100%-320px)]">
        <Outlet />
      </div>
    </>
  );
}
