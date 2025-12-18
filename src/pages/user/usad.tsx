import deposit from '@/assets/images/deposit.png';
import fiat from '@/assets/images/fiat.png';
import transfer from '@/assets/images/transfer.png';
import buy from '@/assets/images/usad-coin.png';
import GradientBorderBox from '@/components/GradientBorderBox';
import No2fa from '@/components/No2fa';
import { history, useModel } from '@umijs/max';

export default function USAD() {
  const { user } = useModel('auth');

  return (
    <>
      {user.is2FA ? (
        <>
          <div className="pb-6 text-[24px] font-bold text-white">USAD</div>
          <div className="grid grid-cols-1 sm:grid-cols-[320px_320px] justify-center cursor-pointer gap-3 sm:gap-8">
            <GradientBorderBox
              gradientClassName="rounded-2xl"
              onClick={() => {
                history.push('/user/usad/buy');
              }}
              className="sm:h-[300px] w-full"
            >
              <div className="h-full relative z-10 flex flex-row gap-10 sm:gap-0 sm:flex-col items-center justify-center black-gradient-bg1 rounded-2xl px-8 py-5">
                <img src={buy} className="sm:w-[140px] sm:h-[140px] w-[104px] h-[104px] block" />
                <div className="flex-1 sm:text-center sm:mt-[30px]">
                  <div className="text-[24px] font-bold text-white">
                    Buy USAD
                  </div>
                  <div className="text-[14px] mt-1 text-[#ADB1B8]">
                    with fiat currency
                  </div>
                </div>
              </div>
            </GradientBorderBox>
            <GradientBorderBox
              gradientClassName="rounded-2xl"
              onClick={() => {
                history.push('/user/usad/transfer');
              }}
              className="sm:h-[300px] w-full"
            >
              <div className="h-full relative z-10 flex flex-row gap-10 sm:gap-0 sm:flex-col items-center justify-center black-gradient-bg1 rounded-2xl px-8 py-5">
                <img src={transfer} className="sm:w-[140px] sm:h-[140px] w-[104px] h-[104px] block" />
                <div className="flex-1 sm:text-center sm:mt-[30px]">
                  <div className="text-[24px] font-bold text-white">
                    Transfer
                  </div>
                  <div className="text-[14px] mt-1 text-[#ADB1B8]">on chain</div>
                </div>
              </div>
            </GradientBorderBox>
            <GradientBorderBox
              gradientClassName="rounded-2xl"
              onClick={() => {
                history.push('/user/usad/deposit');
              }}
              className="sm:h-[300px] w-full"
            >
              <div className="h-full relative z-10 flex flex-row gap-10 sm:gap-0 sm:flex-col items-center justify-center black-gradient-bg1 rounded-2xl px-8 py-5">
                <img src={deposit} className="sm:w-[140px] sm:h-[140px] w-[104px] h-[104px] block" />
                <div className="flex-1 sm:text-center sm:mt-[30px]">
                  <div className="text-[24px] font-bold text-white">
                    Deposit USAD
                  </div>
                  <div className="text-[14px] mt-1 text-[#ADB1B8]">
                    from other exchange/ wallet
                  </div>
                </div>
              </div>
            </GradientBorderBox>
            <GradientBorderBox
              gradientClassName="rounded-2xl"
              onClick={() => {
                history.push('/user/usad/withdraw');
              }}
              className="sm:h-[300px] w-full"
            >
              <div className="h-full relative z-10 flex flex-row gap-10 sm:gap-0 sm:flex-col items-center justify-center black-gradient-bg1 rounded-2xl px-8 py-5">
                <img src={fiat} className="sm:w-[140px] sm:h-[140px] w-[104px] h-[104px] block" />
                <div className="flex-1 sm:text-center sm:mt-[30px]">
                  <div className="text-[24px] font-bold text-white">
                    Fiat withdraw
                  </div>
                  <div className="text-[14px] mt-1 text-[#ADB1B8]">
                    burn gbpc and get your fiat back
                  </div>
                </div>
              </div>
            </GradientBorderBox>
          </div>
        </>
      ) : (
        <No2fa />
      )}
    </>
  );
}
