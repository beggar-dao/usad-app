import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import { history } from '@umijs/max';
import DepositContent from './deposit_content';
import GradientBorderBox from '@/components/GradientBorderBox';
import { useResponsive } from 'ahooks';
import { cn } from '@/utils/cn';

export default function Buy() {
  const { sm: isWeb } = useResponsive();

  return (
    <>
      <div className="flex items-center justify-end sm:justify-between pb-3 text-[24px] font-bold">
        <div className="hidden sm:flex text-sm cursor-pointer leading-[26px] text-white items-center gap-6">
          <span
            onClick={() => {
              history.push('/user/usad/buy');
            }}
          >
            Buy USAD
          </span>
          <span
            onClick={() => {
              history.push('/user/usad/transfer');
            }}
          >
            Transfer
          </span>
          <span className="gold-gradient-text border-b border-b-[#C69F58]">
            Deposit USAD
          </span>
          <span
            onClick={() => {
              history.push('/user/usad/withdraw');
            }}
          >
            Fiat withdraw
          </span>
        </div>
        <CloseSvg
          className="cursor-pointer"
          onClick={() => {
            history.push('/user/usad');
          }}
        />
      </div>

      <GradientBorderBox className="w-auto sm:w-[580px] m-auto !mt-[96px]" gradientClassName="rounded-2xl">
        <div className={cn("sm:p-8 rounded-2xl relative z-10", isWeb ? 'black-gradient-bg2' : '')}>
          <DepositContent />
        </div>
      </GradientBorderBox>
    </>
  );
}
