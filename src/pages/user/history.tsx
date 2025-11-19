import { ExportIcon } from '@/components/Icons';
import { TransactionsParams } from '@/services/wallet/account';
import { useState } from 'react';
import { HistoryFilter, HistoryTable } from './components/history';

export default function History() {
  const [filterParams, setFilterParams] = useState<TransactionsParams>({});

  return (
    <>
      <div className=" pb-3 flex items-center justify-between ">
        <span className="text-2xl font-bold text-white">History</span>
        <ExportIcon />
      </div>
      <div className="text-sm text-[#ADB1B8] leading-[26px] flex items-center mb-6">
        A detailed record of all your past transfers and activities
      </div>
      <HistoryFilter
        onValuesChange={(
          _: { [key: string]: string },
          values: TransactionsParams,
        ) => setFilterParams(values)}
      />
      <HistoryTable filterParams={filterParams} />
    </>
  );
}
