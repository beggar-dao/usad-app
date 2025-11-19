import { WalletAccountTransactionItem } from '@/services/wallet/account';
import { cn } from '@/utils/cn';
import { Link } from '@umijs/max';
import { message } from 'antd';
import dayjs from 'dayjs';
import { Copy } from 'lucide-react';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TradeType } from '../../utils/constants';
import { getTradeType } from '../../utils/history';

interface DetailInfoProps {
  record: WalletAccountTransactionItem;
}

const DetailInfo: React.FC<DetailInfoProps> = ({ record }) => {
  const isFiatAndBuy =
    record.tradeType === TradeType.Buy ||
    record.tradeType === TradeType.FiatWithdrawal;
  const isFiatWithdrawal = record.tradeType === TradeType.FiatWithdrawal;
  const isTransfer = record.tradeType === TradeType.Transfer;
  const isDeposit = record.tradeType === TradeType.Deposit;
  const handleCopy = () => {
    message.success('Copied to clipboard');
  };

  const InfoRow = ({
    label,
    value,
    onClick,
    canCopy = false,
  }: {
    label: string;
    value?: string | number;
    onClick?: () => void;
    canCopy?: boolean;
  }) => (
    <div className="flex justify-between items-center py-[8px] gap-4">
      <span className="text-[#A3ABC0]">{label}</span>
      <div
        className="flex items-center gap-2 overflow-hidden"
        onClick={onClick}
      >
        {label === 'Txid' ? (
          <Link
            to="/"
            className="text-white underline cursor-pointer hover:!text-blue-400 max-w-[285px] overflow-hidden break-words"
          >
            {value}
          </Link>
        ) : (
          <span className={cn('text-white text-sm')}>{value}</span>
        )}
        {canCopy && (
          <CopyToClipboard text={String(value)}>
            <Copy
              className="text-white cursor-pointer transition-colors hover:opacity-80"
              strokeWidth={1.5}
              size={16}
              onClick={() => handleCopy()}
            />
          </CopyToClipboard>
        )}
      </div>
    </div>
  );

  return (
    <div className="rounded-lg text-sm p-[8px]">
      {isFiatAndBuy ? (
        <>
          <InfoRow
            label="Price"
            value={`${record.price} ${record.fiatCurrency}/USAD`}
          />
          <InfoRow
            label={isFiatWithdrawal ? 'Amount Sent' : 'Spend Amount'}
            value={record.fiatAmount}
          />
          <InfoRow label="Fee" value="0.1%" />
          <InfoRow label="Method" value={record.method} />
          <InfoRow
            label="Date"
            value={
              record.timestamp
                ? dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')
                : '-'
            }
          />
          <InfoRow
            label="Transaction ID"
            value={record.tradeId}
            canCopy={true}
          />
        </>
      ) : (
        <>
          <InfoRow label="Network" value={record.chainName} />
          <InfoRow label="Type" value={getTradeType(record.tradeType)} />
          <InfoRow label="Amount" value={`${record.amount} USAD`} />
          <InfoRow label="Network fee" value={record.fee} />
          {!isDeposit && (
            <InfoRow
              label={isTransfer ? 'Address to' : 'Address from'}
              value={isTransfer ? record.toAddress : record.address}
              canCopy={true}
            />
          )}
          <InfoRow
            label="Txid"
            value={record.txId}
            canCopy={true}
            onClick={() => window.open(record.txUrl, '_blank')}
          />
          <InfoRow
            label="Date"
            value={
              record.timestamp
                ? dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')
                : '-'
            }
          />
        </>
      )}
    </div>
  );
};

export default DetailInfo;
