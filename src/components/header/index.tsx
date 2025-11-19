import logo from '@/assets/images/logo.png';
import { history, NavLink, useLocation } from '@umijs/max';

export default function Header() {
  const location = useLocation();

  const nav = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Circulate',
      path: '/mint',
    },
  ];

  return (
    <div className="border-b border-b-[#FFFFFF24]">
      <div className="container mx-auto w-full flex items-center gap-4">
        <div className="flex flex-1 h-[87px] items-center">
          <img
            onClick={() => history.push('/')}
            src={logo}
            className="h-[20px] md:h-[32px] cursor-pointer"
            alt=""
          />
          <div className="md:ml-[138px] flex items-center">
            {nav.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => history.push(item.path)}
                  className={`${index === nav.length - 1 ? '' : 'mr-6'
                    } md:mr-[66px] cursor-pointer transition-all font-[500] ${location.pathname === item.path
                      ? 'text-[#DAC89F]'
                      : 'text-white'
                    }`}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-content-end">
          <NavLink
            to="https://app.pathenom.com/"
            target="_blank"
            className="h-10 px-5 mx-4 gold-gradient-bg rounded-lg leading-10"
          >
            <span className="font-[500] text-shadow">Launch App</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
