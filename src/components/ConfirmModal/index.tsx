import { useModel } from '@umijs/max';
import { Modal } from 'antd';

export default function ConfirmModal({
  confirm,
  content,
}: {
  confirm: () => void;
  content?: string;
}) {
  const { confirmModal, setConfirmModal } = useModel('global');
  return (
    <Modal
      onCancel={() => {
        setConfirmModal(false);
      }}
      centered
      width={488}
      maskClosable={false}
      footer={null}
      open={confirmModal}
    >
      <div className="px-4 !py-5">
        <div className="text-center mb-[50px] mt-[30px] text-white text-sm leading-[22px]">
          {content || 'Are you sure you want to delete this bank account?'}
        </div>
        <div className="flex items-center justify-between">
          <div
            onClick={() => {
              confirm();
              // setConfirmModal(false);
            }}
            className="text-white flex-1 text-center cursor-pointer font-bold rounded-lg gold-gradient-bg leading-[48px]"
          >
            Yes
          </div>
          <div
            onClick={() => {
              setConfirmModal(false);
            }}
            className="border flex-1 ml-6 text-center cursor-pointer text-[#C69F58] font-bold border-[#4F4F4F] rounded-lg leading-[48px]"
          >
            No
          </div>
        </div>
      </div>
    </Modal>
  );
}
