import v1 from '@/assets/images/v1.png';
import v2 from '@/assets/images/v2.png';
import GradientBorderBox from '@/components/GradientBorderBox';
import No2fa from '@/components/No2fa';
import { cn } from '@/utils/cn';
import { history, useModel } from '@umijs/max';
import { useEffect } from 'react';

export default function Verification() {
  const { user } = useModel('auth');
  const { verifi, setIndividualData, setBusinessData, corporate, init } =
    useModel('verify');

  const status = {
    2: {
      name: 'Accepted',
      color: '#6ECE82',
      bgColor: '#6ECE8233',
    },
    3: {
      name: 'Rejected',
      color: '#FF2121',
      bgColor: '#FF212133',
    },
    1: {
      name: 'Awating for approval',
      color: '#f1a840ff',
      bgColor: '#f1a84033',
    },
    0: {
      name: 'Awating for approval',
      color: '#f1a840ff',
      bgColor: '#f1a84033',
    },
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {user.is2FA ? (
        <>
          <div className="pb-3 text-[24px] font-bold text-white">
            Verification
          </div>
          {verifi.status === 2 && corporate.status === 2 ? (
            <div
              style={{
                backgroundColor: status[2]?.bgColor || status[2]?.bgColor,
                color: status[2]?.color || status[2]?.color,
              }}
              className="inline-block h-7 leading-7 rounded-[4px] !px-5 text-sm font-[700]"
            >
              {status[2]?.name}
            </div>
          ) : null}
          <div
            style={{ minHeight: `calc(100% - 96px)` }}
            className="grid grid-cols-2 items-center gap-8 max-w-[1084px] mx-auto"
          >
            <GradientBorderBox
              onClick={() => {
                if (
                  verifi.status === 1 ||
                  verifi.status === 2 ||
                  corporate.status === 1
                ) {
                  return;
                }
                setBusinessData({});
                history.push('/user/verification/start?type=individual');
              }}
              className={cn("cursor-pointer h-full", verifi.status === 1 ||
                verifi.status === 2 ||
                corporate.status === 1
                ? 'opacity-50'
                : '')}
              gradientClassName="rounded-2xl"
            >
              <div className={cn("flex-1 px-2 h-full rounded-2xl black-gradient-bg1 relative z-10 pt-[52px]")}>
                {(corporate.status !== 2 ||
                  (verifi.status !== 2 && corporate.status === 2)) &&
                  verifi.status !== 0 ? (
                  <div
                    style={{
                      backgroundColor: status[verifi.status]?.bgColor,
                      color: status[verifi.status]?.color,
                    }}
                    className="inline-block absolute top-6 right-3 h-7 leading-7 rounded-[4px] !px-5 text-sm font-[700]"
                  >
                    {status[verifi.status]?.name}
                  </div>
                ) : null}
                <img src={v1} className="block h-[125px] m-auto " />
                <div className="text-[24px] font-[700] mt-6 text-center">
                  Individual Verification
                </div>
                <div className="text-sm mb-[40px] text-center text-[#ADB1B8] leading-[26px] px-[50px]">
                  Available for individuals 18 years of age or older
                </div>
              </div>
            </GradientBorderBox>

            <GradientBorderBox
              onClick={() => {
                if (verifi.status === 1 || corporate.status === 2) {
                  return;
                }
                setIndividualData({});

                if (corporate.status === 1) {
                  history.push('/user/verification/corporate/step2_2');
                  return;
                }
                history.push('/user/verification/start?type=corporate');
              }}
              className={cn("cursor-pointer h-full", verifi.status === 1 ||
                corporate.status === 2
                ? ' opacity-50'
                : '')}
              gradientClassName="rounded-2xl"
            >
              <div className={cn("flex-1 px-2 h-full rounded-2xl black-gradient-bg1 relative z-10 pt-[52px]")}>
                {(verifi.status !== 2 ||
                  (verifi.status !== 2 && corporate.status === 2)) &&
                  corporate.status !== 0 ? (
                  <div
                    style={{
                      backgroundColor: status[corporate.status]?.bgColor,
                      color: status[corporate.status]?.color,
                    }}
                    className="inline-block absolute top-6 right-3 h-7 leading-7 rounded-[4px] !px-5 text-sm font-[700]"
                  >
                    {status[corporate.status]?.name}
                  </div>
                ) : null}
                <img src={v2} className="block h-[125px] m-auto" />
                <div className="text-[24px] font-[700] mt-6 text-center">
                  Corporate Verification
                </div>
                <div className="text-sm mb-[40px] text-center text-[#ADB1B8] leading-[26px] px-[50px]">
                  An account in the name of a corporation/partnership/trust
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
