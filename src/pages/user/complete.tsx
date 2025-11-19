import complete from '@/assets/images/success.png';
import TimeLine from '@/components/Timeline';
import { history, useModel, useSearchParams } from '@umijs/max';
import { useEffect } from 'react';

export default function Complete() {
  const [searchParams] = useSearchParams();
  const { setBusinessData, setIndividualData } = useModel('verify');

  useEffect(() => {
    return () => {
      setBusinessData({});
      setIndividualData({});
    };
  }, []);

  return (
    <>
      <div className="w-[588px] relative m-auto rounded-[16px] pt-[40px] border border-[#505050]">
        <TimeLine active={4} progress={100} />
        <div className="flex h-[700px] flex-col justify-center items-center">
          <div>
            <img src={complete} className="block m-auto w-[100px]" />
            <div className="text-center mt-6 font-bold text-white text-[24px]">
              Your {searchParams.get('type') === 'kyb' ? 'KYB' : 'KYC'} has been
              submitted for verification
            </div>
            <div className="text-center mt-3 text-[#ADB1B8] text-[14px] leading-[22px]">
              We're currently reviewing your details.
              <br />
              You'll be notified once it's approved.
            </div>

            <div
              onClick={() => {
                history.push('/user/verification');
              }}
              className="w-[270px] m-auto !mt-[60px] cursor-pointer hover:opacity-80 transition-all h-[48px] gold-gradient-bg rounded-lg leading-[48px] text-center text-white text-shadow font-bold"
            >
              Check Status
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
