import { ReactComponent as Right } from '@/assets/images/right.svg';

interface Props {
  active: number;
  progress: number;
}

export default function TimeLine({
  active,
  progress,
}: Props) {
  return (
    <div className="flex flex-row w-full sm:w-auto sm:flex-col items-center justify-center absolute top-0 sm:left-[-77px] sm:top-[37px]">
      <div
        className={`w-[28px] h-[28px] text-sm ${active === 1
          ? `!border !border-[#BCBCBC] text-white gold-gradient-bg`
          : `!border !border-[#DEC08B] text-[#BCBCBC]`
          } rounded-full text-center flex items-center justify-center`}
      >
        {active <= 1 ? 1 : <Right />}
      </div>
      <div className="relative">
        <div
          style={{ height: `${active === 1 ? progress : 100}%` }}
          className="w-[1px] absolute top-0 bg-[#DEC08B]"
        ></div>
        <div className="sm:w-[1px] sm:h-[70px] w-[70px] h-[1px] bg-[#666]"></div>
      </div>
      <div
        className={`w-[28px] h-[28px] text-sm ${active === 2
          ? `!border !border-[#DEC08B] text-white gold-gradient-bg`
          : `!border ${active < 2 ? `!border-[#BCBCBC]` : `!border-[#DEC08B]`
          } text-[#BCBCBC] `
          } rounded-full text-center flex items-center justify-center`}
      >
        {active <= 2 ? 2 : <Right />}
      </div>
      <div className="relative">
        <div
          style={{
            height: `${active < 2 ? 0 : active === 2 ? progress : 100}%`,
          }}
          className="w-[1px] absolute top-0 bg-[#DEC08B]"
        ></div>
        <div className="sm:w-[1px] sm:h-[70px] w-[70px] h-[1px] bg-[#666]"></div>
      </div>
      <div
        className={`w-[28px] h-[28px] text-sm ${active === 3
          ? `border border-[#DEC08B] text-white gold-gradient-bg`
          : `border ${active < 3 ? `!border-[#BCBCBC]` : `!border-[#DEC08B]`
          } text-[#BCBCBC] `
          } rounded-full text-center flex items-center justify-center`}
      >
        {active <= 3 ? 3 : <Right />}
      </div>
    </div>
  );
}
