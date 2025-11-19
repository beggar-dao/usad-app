import { useState } from 'react';
export default function useWindowModel() {
  const [width, setWidth] = useState(0);
  const [isWeb, setIsWeb] = useState(false);
  const [isPd, setIsPd] = useState(false);
  const [isPh, setIsPh] = useState(false);
  const [ios, setIos] = useState(false);
  const [android, setAndroid] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const mqlWeb = window.matchMedia('(min-width: 1200px)');
  // const mqlMinWeb = window.matchMedia('(min-width: 1200px) and (max-width: 1470px)')
  const mqlPd = window.matchMedia('(min-width: 744px) and (max-width: 1200px)');
  const mqlPh = window.matchMedia('(max-width: 744px)');
  let mq = '';
  if (mqlWeb.matches) {
    mq = 'web';
  } else if (mqlPd.matches) {
    mq = 'pd';
  } else if (mqlPh.matches) {
    mq = 'ph';
  }
  // setWidth(document.body.offsetWidth)
  // setIsWeb(mq === 'web')
  // setIsPd(mq === 'pd')
  // setIsPh(mq === 'ph')
  // setIos(/iphone|ipad|ipod|ios/i.test(window?.navigator.userAgent.toLocaleLowerCase()))
  // setAndroid(/android/i.test(window?.navigator.userAgent.toLocaleLowerCase()))
  // setIsMac(/macintosh|mac os x/i.test(window?.navigator.userAgent.toLocaleLowerCase()))
  const check = () => {
    setWidth(document.body.offsetWidth);
    setIsWeb(mq === 'web');
    setIsPd(mq === 'pd');
    setIsPh(mq === 'ph');
    setIos(
      /iphone|ipad|ipod|ios/i.test(
        window?.navigator.userAgent.toLocaleLowerCase(),
      ),
    );
    setAndroid(
      /android/i.test(window?.navigator.userAgent.toLocaleLowerCase()),
    );
    setIsMac(
      /macintosh|mac os x/i.test(
        window?.navigator.userAgent.toLocaleLowerCase(),
      ),
    );
  };
  return {
    isWeb,
    width,
    isPd,
    isPh,
    ios,
    android,
    isMac,
    check,
  };
}
