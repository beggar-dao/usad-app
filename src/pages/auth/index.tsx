import Menu from '@/components/Menu';
import { Outlet } from '@umijs/max';

export default function Auth() {
  return (
    <>
      <div className="absolute">
        <Menu />
      </div>
      <div className="relative m-[34px] left-[256px] w-[calc(100%-320px)]">
        <Outlet />
      </div>
    </>
  );
}
