import eventManager from '@/utils/eventmanager';
import { useEffect, useState } from 'react';

export default function useDialogState() {
  const [loginModel, setLoginModel] = useState(false);
  const [emailModel, setEmailModel] = useState(false);
  const [passwordModel, setPasswordModel] = useState(false);
  const [cookieModel, setCookieModel] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: '',
    type: 'error',
  });
  const callback = (data: any) => {
    setAlertInfo({
      show: data.show || true,
      message: data.message,
      type: data.type,
    });
  };

  useEffect(() => {
    // 订阅事件
    eventManager.subscribe('showAlert', callback);

    // 清理函数，取消订阅
    return () => {
      eventManager.unsubscribe('showAlert', callback);
    };
  }, []);

  const [resetStep, setResetStep] = useState(1);

  return {
    loginModel,
    setLoginModel,
    emailModel,
    setEmailModel,
    passwordModel,
    setPasswordModel,
    alertInfo,
    setAlertInfo,
    cookieModel,
    setCookieModel,
    resetStep,
    setResetStep,
  };
}
