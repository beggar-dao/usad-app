import { ReactComponent as CloseSvg } from '@/assets/images/close.svg';
import { ReactComponent as CreateSvg } from '@/assets/images/create.svg';
import { ReactComponent as DelSvg } from '@/assets/images/del.svg';
import { ReactComponent as EditSvg } from '@/assets/images/edit.svg';
import { ReactComponent as PeopleSvg } from '@/assets/images/people.svg';
import TimeLine from '@/components/Timeline';
import { history, useModel } from '@umijs/max';
import { Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import AddUbo from '../add';
import GradientBorderBox from '@/components/GradientBorderBox';

export default function Step1_1() {
  const { setUboModal, uboList, handleDelUbo, handleGetUboList, businessData } =
    useModel('verify');
  const [obj, setObj] = useState({});

  useEffect(() => {
    if (businessData.id) {
      handleGetUboList();
    }
  }, [businessData]);

  const handleSubmit = async () => {
    history.push('/user/verification/corporate/step2_2');
  };

  return (
    <>
      <AddUbo data={obj} />
      <div className="flex items-center justify-between pb-3 text-[24px] font-bold text-[#202B4B]">
        <div></div>
        <CloseSvg
          className="cursor-pointer"
          onClick={() => {
            history.push('/user/verification');
          }}
        />
      </div>
      <GradientBorderBox className="w-[588px] m-auto" gradientClassName="rounded-[16px]">
        <div className="relative z-10 rounded-[16px] pt-[40px] black-gradient-bg5">
          <TimeLine active={2} progress={100} />
          <div className="w-full h-[600px] pb-8 overflow-y-auto px-8">
            <div className="text-[24px] text-white font-bold mb-3">
              Associated parties of your company
            </div>
            <div className="text-sm !mb-4 text-[#666] leading-[24px]">
              Check the associated parties of your company and,if necessary, edit
              them
            </div>
            <div className="mt-[48px] text-[#ADB1B8] text-sm leading-6">UBO</div>
            {uboList
              .filter((item: any) => item.type === 0)
              .map((_: any, index) => (
                <div
                  key={index}
                  className="mt-2 bg-[#191919] rounded-xl py-3 px-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[14px] text-white">
                      <PeopleSvg /> {_.firstname} {_.lastname}
                    </div>
                    <div className="items-center cursor-pointer flex gap-2">
                      <EditSvg
                        onClick={() => {
                          setObj(_);
                          setUboModal(true);
                        }}
                      />
                      <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this ?"
                        onConfirm={() => handleDelUbo(_.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DelSvg />
                      </Popconfirm>
                    </div>
                  </div>
                  <div className="mt-3 text-[#ADB1B8] text-sm">{_.email}</div>
                </div>
              ))}
            {uboList.filter((item: any) => item.type === 0).length !== 5 ? (
              <div
                onClick={() => {
                  setObj({
                    type: 0,
                  });
                  setUboModal(true);
                }}
                className="inline-flex mt-2 cursor-pointer items-center text-[14px] text-white px-6 h-[40px] border border-[#25282C] rounded-lg bg-[#1E2023]"
              >
                <CreateSvg className="mr-2" /> Add individual
              </div>
            ) : null}
            <div className="mt-[24px] text-[#ADB1B8] text-sm leading-6">
              Representative
            </div>
            {uboList
              .filter((item: any) => item.type === 1)
              .map((_: any, index) => (
                <div
                  key={index}
                  className="mt-2 bg-[#191919] rounded-xl py-3 px-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[14px] text-[#ADB1B8]">
                      <PeopleSvg /> {_.firstname} {_.lastname}
                    </div>
                    <div className="items-center cursor-pointer flex gap-2">
                      <EditSvg
                        onClick={() => {
                          setObj(_);
                          setUboModal(true);
                        }}
                      />
                      <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this ?"
                        onConfirm={() => handleDelUbo(_.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DelSvg />
                      </Popconfirm>
                    </div>
                  </div>
                  <div className="mt-3 text-[#ADB1B8] text-sm">{_.email}</div>
                </div>
              ))}
            {uboList.filter((item: any) => item.type === 1).length !== 5 ? (
              <div
                onClick={() => {
                  setObj({
                    type: 1,
                  });
                  setUboModal(true);
                }}
                className="inline-flex mt-2 cursor-pointer items-center text-[14px] text-white px-6 h-[40px] border border-[#25282C] rounded-lg bg-[#1E2023]"
              >
                <CreateSvg className="mr-2" /> Add individual
              </div>
            ) : null}
          </div>
          <div className="w-full rounded-bl-2xl rounded-br-2xl  h-[104px] px-[40px] gap-[23px] flex items-center justify-between">
            <div
              onClick={() => (uboList.length ? handleSubmit() : null)}
              className={`w-[390px] ${!uboList.length ? ' opacity-60' : ''
                }  cursor-pointer h-[48px] leading-[48px] text-center text-white font-[500] gold-gradient-bg rounded-lg text-shadow`}
            >
              Continue
            </div>
            <div
              onClick={() => {
                history.back();
              }}
              className="flex-1 cursor-pointer h-[48px] leading-[48px] border border-[#25282C] rounded-lg font-[500] text-center text-[#C69F58]"
            >
              Back
            </div>
          </div>
        </div>
      </GradientBorderBox >
    </>
  );
}
