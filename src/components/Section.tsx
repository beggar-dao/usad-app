import AnimatedImg from './AnimatedImg';

export default function Section(props: {
  title: string | React.ReactNode;
  desc?: string;
  src: string;
  transparency?: boolean;
  contact?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full pb-[100px] ">
      <div className="max-w-[1440px] m-auto flex justify-between">
        <div className="w-[660px]">
          <AnimatedImg
            animateClassName="animate__slideInDown"
            className="mt-[240px] mb-[48px] text-[#202B4B] font-bold text-[80px]"
          >
            {props.title}
          </AnimatedImg>
          <AnimatedImg
            animateClassName="animate__fadeInUp"
            className="text-base text-[#202B4B] leading-6"
          >
            {props.desc}
            {props.children}
          </AnimatedImg>
        </div>
        <img
          className={` ${!props.contact ? `object-contain w-[620px] h-[620px]` : ` w-[500px]`
            } mt-[50px]`}
          src={props.src}
        />
      </div>

      {props.transparency ? (
        <div className="max-w-[1440px] m-auto">
          <div className="max-w-[1440px] font-[400] p-[48px] m-auto mt-[50px] rounded-[24px] bg-[#fff] shadow-[0_4px_8px_8px_0px_rgba(0,0,0,0.04)]">
            <div>
              The integrity and long-term trust of the USAD stablecoin ecosystem
              are built on a foundation of transparency, over-collateralization,
              and independent third-party validation. Our reserve management
              framework, routine audits, and secure technical infrastructure
              align with the highest global standards for stablecoins and
              fiat-backed digital assets. All USA reserves backing USAD at a 1:1
              ratio are securely held in segregated accounts across multiple
              trusted financial institutions. This ensures that every USAD token
              in circulation is fully supported by verifiable fiat reserves.
            </div>
            <div className="mt-3">
              Transparency is at the core of USAD’s design, users can
              independently verify the total circulating supply of USAD on-chain
              at any time. To further support trust and accountability, we
              publish quarterly reserve attestations prepared and verified by a
              leading independent audit firm. These downloadable reports confirm
              that every USAD token in circulation is fully backed by fiat
              reserves, held securely and managed in compliance with our reserve
              framework. Our mission is to help build a secure, competitive, and
              sustainable digital asset ecosystem — one that promotes innovation
              while protecting market integrity and the interests of users.
            </div>
          </div>
        </div>
      ) : null}
      {props.contact ? <div className="pt-[100px]">{props.contact}</div> : null}
    </div>
  );
}
