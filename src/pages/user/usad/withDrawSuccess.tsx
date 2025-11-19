import complete from '@/assets/images/fiat.png';
import { history, useModel } from '@umijs/max';
import { Modal } from 'antd';

export default function WithDrawSuccess() {
  const { withDrawSuccess, setWithDrawSuccess } = useModel('gbpc');

  return (
    <Modal
      onCancel={() => {
        setWithDrawSuccess(false);
      }}
      centered
      maskClosable={false}
      footer={null}
      open={withDrawSuccess}
      zIndex={9999}
    >
      <div className="p-2">
        <img
          src={complete}
          className="block w-[80px] m-auto mt-4"
          alt="success"
        />
        <div className="text-center font-bold text-[24px] leading-8 mt-4 text-white">
          Withdrawal Submitted
        </div>
        <div className="text-center leading-5 text-[#ADB1B8] mt-2">
          Your USAD tokens have been successfully burned. <br />
          The equivalent amount in USA will be deposited into your bank account
          shortly. <br />
          Processing typically takes up to one business day
        </div>
        <div className="flex items-center gap-6 justify-between mt-10 ">
          <div
            onClick={() => {
              setWithDrawSuccess(false);
              history.push('/user/wallet');
            }}
            className="rounded-lg border border-[#25282C] flex-1 cursor-pointer text-[#C69F58] leading-[48px] text-center"
          >
            Check Status
          </div>
          <div
            onClick={() => {
              setWithDrawSuccess(false);
              history.push('/user/history');
            }}
            className="rounded-lg flex-1 cursor-pointer gold-gradient-bg text-white text-shadow leading-[48px] text-center text-shadow"
          >
            View History
          </div>
        </div>
        <div
          className="text-center mt-3 cursor-pointer gold-gradient-text"
          onClick={() => {
            setWithDrawSuccess(false);
            history.push('/ContactUs');
          }}
        >
          Contact us
        </div>
      </div>
    </Modal>
  );
}
