import lock from '@/assets/images/no_bank.png';
import { history } from '@umijs/max';
import GradientBorderBox from '../GradientBorderBox';

export default function NoBank() {
  return (
    <div className="h-full flex items-center justify-center mb-16">
      <GradientBorderBox className="m-auto" gradientClassName="rounded-2xl">
        <div className="w-[690px] black-gradient-bg2 rounded-2xl py-[40px] relative z-10">
          <img src={lock} className="block m-auto w-[180px]" />
          <div className="text-center text-[14px] mt-[20px] mb-[24px] text-[#ADB1B8]">
            No bank account added...
          </div>
          <div
            onClick={() => {
              history.push('/user/payment/addBank');
            }}
            className="m-auto cursor-pointer max-w-[244px] flex items-center gold-gradient-bg justify-center h-[48px] text-white rounded-lg"
          >
            Add Bank Account
          </div>
        </div>
      </GradientBorderBox>
    </div>
  );
}
