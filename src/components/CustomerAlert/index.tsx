import { useModel } from '@umijs/max';
import { Alert } from 'antd';
import { useEffect } from 'react';

interface AlertInfo {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export default function CustomerAlert() {
  const { alertInfo, setAlertInfo } = useModel('dialogState') as {
    alertInfo: AlertInfo;
    setAlertInfo: (info: AlertInfo) => void;
  };

  // 自动隐藏 Alert
  useEffect(() => {
    if (alertInfo?.show) {
      const timer = setTimeout(() => {
        setAlertInfo({
          show: false,
          message: alertInfo.message,
          type: alertInfo.type,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alertInfo?.show, alertInfo?.message, alertInfo?.type, setAlertInfo]);

  if (!alertInfo.message) {
    return null;
  }

  return (
    <Alert
      className={`fixed z-[999999] top-[100px] right-[80px] animate__animated ${
        alertInfo?.show ? 'animate__fadeInRight' : 'animate__fadeOutRight'
      }`}
      message={alertInfo.message}
      type={alertInfo.type}
      showIcon
    />
  );
}
