import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import { ReactComponent as PeopleSvg } from '@/assets/images/people.svg';
import { ReactComponent as RefrenceSvg } from '@/assets/images/refrence.svg';
import GradientBorderBox from '@/components/GradientBorderBox';

import TimeLine from '@/components/Timeline';
import {
  businessRealNameRealness,
  businessSendEmail,
  getRZM,
} from '@/services/user';
import { history, useModel } from '@umijs/max';
import { useEffect } from 'react';
import { useResponsive } from 'ahooks';
import { cn } from '@/utils/cn';

export default function Step2_2() {
  const { sm: isWeb } = useResponsive();
  const { uboList, handleGetUboList, businessData } = useModel('verify');
  const { setAlertInfo } = useModel('dialogState');
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
      color: '#202B4B',
      bgColor: '#202B4B33',
    },
  };
  function fallbackCopyTextToClipboard(text = '') {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Could not copy text', err);
    }
    document.body.removeChild(textArea);
  }
  const copy = (text: string) => {
    if (navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard
        .writeText(text)
        .then(() => { })
        .catch((err) => {
          console.error('Failed to copy:', err);
          fallbackCopyTextToClipboard(text); // 回退到 execCommand
        });
    } else {
      fallbackCopyTextToClipboard(text);
    }
    setAlertInfo({
      type: 'success',
      message: 'Copied successfully',
      show: true,
    });
  };
  useEffect(() => {
    if (businessData.id) {
      handleGetUboList();
    }
  }, [businessData]);

  const handleSubmit = async () => {
    await businessRealNameRealness({
      id: businessData.id,
    });
    history.push('/user/verification/complete?type=kyb');
  };

  return (
    <>
      <div className="flex items-center justify-between pb-3 text-[24px] font-bold text-[#202B4B]">
        <div></div>
        <CloseSvg
          className="cursor-pointer"
          onClick={() => {
            history.push('/user/verification');
          }}
        />
      </div>
      <GradientBorderBox className="w-auto sm:w-[588px] m-auto" gradientClassName="rounded-[16px]">
        <div className={cn('relative z-10 rounded-[16px] pt-[40px]', isWeb ? 'black-gradient-bg5' : '')}>
          <TimeLine active={3} progress={100} />
          <div className="w-full sm:h-[600px] overflow-y-auto px-0 sm:px-8">
            <div className="text-[24px] text-white font-bold mb-3">
              Verification not yet complete
            </div>
            <div className="text-[13px] border border-[#F3974F] flex items-center h-[48px] px-4 rounded-lg  bg-[#FFA60014] text-[#EE6700] ">
              To verify the company, all Associated Parties must complete
              verification.
            </div>
            <div className="flex mt-[42px] items-center gap-2 font-bold">
              <RefrenceSvg /> Company details
            </div>
            <div className="flex mt-[20px] items-center gap-2 font-bold">
              <RefrenceSvg /> Questionnaire
            </div>
            <div className="flex mt-[20px] items-start gap-2 ">
              <RefrenceSvg />
              <div className="w-full">
                <div className="font-bold">Associated parties</div>
                <div className="text-[#5B6276] mt-2">Verification required</div>
                {uboList.map((_: any, index) => (
                  <div
                    key={index}
                    className="mt-2 bg-[#191919] rounded-xl p-2 overflow-x-auto sm:px-4 sm:py-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[14px] text-[#ADB1B8]">
                        <PeopleSvg />
                        <div className="mr-4 text-white">
                          {_.firstname} {_.lastname}
                        </div>
                        <div className="rounded-[4px] text-xs text-[#ADB1B8] leading-6 text-center px-2 bg-[#202B4B1F]">
                          {_.type === 0 ? 'UBO' : 'Representative'}
                        </div>
                        <div
                          style={{
                            backgroundColor:
                              status[_.status]?.bgColor ||
                              status[_.status]?.bgColor,
                            color:
                              status[_.status]?.color || status[_.status]?.color,
                          }}
                          className={`rounded-[4px] text-xs  leading-6 text-center px-2 `}
                        >
                          {status[_.status]?.name}
                        </div>
                      </div>
                      <div className="items-center flex gap-2"></div>
                    </div>
                    {_.status === 1 || _.status === 2 ? null : (
                      <div className="mt-3 flex items-center gap-2 sm:gap-4">
                        <div
                          onClick={async () => {
                            let res = await getRZM({ id: _.id });
                            history.push(
                              `${window.location.origin}/user/verification/corporate/step3?code=${res.data}&id=${_.id}`,
                            );
                          }}
                          className="h-[40px] whitespace-nowrap leading-[40px] rounded-[4px] text-sm text-white gold-gradient-bg text-shadow cursor-pointer px-2 sm:!px-5"
                        >
                          Verify {_.status === 3 ? 'Again' : 'Now'}
                        </div>
                        <div
                          onClick={async () => {
                            await businessSendEmail({ id: _.id });

                            setAlertInfo({
                              show: true,
                              message: 'Email sent successfully',
                              type: 'success',
                            });
                          }}
                          className="h-[40px] whitespace-nowrap leading-[40px] rounded-[4px] text-sm text-[#C69F58] cursor-pointer px-2 sm:!px-5 border border-[#25282C]"
                        >
                          Send to email
                        </div>
                        <div
                          onClick={async () => {
                            let res = await getRZM({ id: _.id });
                            copy(
                              `${window.location.origin}/user/verification/corporate/step3?code=${res.data}&id=${_.id}`,
                            );
                          }}
                          className="h-[40px] whitespace-nowrap leading-[40px] rounded-[4px] text-sm text-[#C69F58] cursor-pointer px-2 sm:!px-5 border border-[#25282C]"
                        >
                          Copy link
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {uboList.length &&
            uboList.filter((item: any) => item.status === 0).length === 0 ? (
            <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto w-full rounded-bl-2xl rounded-br-2xl h-[104px] px-3 sm:px-[40px] gap-3 sm:gap-6 flex flex-row-reverse sm:flex-row items-center justify-between">
              <div
                onClick={handleSubmit}
                className="w-[210px] sm:w-[390px] cursor-pointer h-[48px] leading-[48px] text-center text-white text-shadow font-[500] gold-gradient-bg rounded-lg"
              >
                Submit for Verification
              </div>
              <div
                onClick={() => {
                  history.back();
                }}
                className="flex-1 cursor-pointer h-[48px] leading-[48px] border border-[#202B4B14] rounded-lg font-[500] text-center"
              >
                Back
              </div>
            </div>
          ) : null}
        </div>
      </GradientBorderBox>
    </>
  );
}
