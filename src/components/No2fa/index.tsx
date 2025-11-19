import lock from '@/assets/images/lock.png';

export default function No2fa({
  title = 'Two-factor authentication required',
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-[690px] black-gradient-bg2 rounded-2xl border border-[#505050] py-[60px] m-auto">
        <img src={lock} className="block m-auto w-[180px]" />
        <div className="text-center text-[24px] mt-6">
          {title}
        </div>
        <div className="mt-4 text-center leading-6 text-[#5B6276] text-sm">
          {children || (
            <div>
              for your account security, you can enable Two-Factor <br />
              Authentication from the Security section in your
              <span className="text-[#5B6276] font-bold"> Profile</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
