import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import { history } from '@umijs/max';
import DepositContent from './deposit_content';
import GradientBorderBox from '@/components/GradientBorderBox';

export default function Buy() {
  return (
    <>
      <div className="flex items-center justify-between pb-3 text-[24px] font-bold">
        <div className="text-sm cursor-pointer leading-[26px] text-white flex items-center gap-6">
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

      <GradientBorderBox className="w-[580px] m-auto !mt-[96px]" gradientClassName="rounded-2xl">
        <div className="black-gradient-bg2 relative z-10 p-8 rounded-2xl">
          <DepositContent />
        </div>
      </GradientBorderBox>
    </>
  );
}
