import {
  getTransaction,
  TransactionsParams,
  WalletAccountTransactionItem,
  WalletAccountTransactionResponse,
} from '@/services/wallet/account';
import { useRequest } from '@umijs/max';
import { Button, ConfigProvider, Popover, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { FunctionComponent, useCallback, useState } from 'react';
import { TradeType } from '../../utils/constants';
import { getStatus, getStatusClass, getTradeType } from '../../utils/history';
import DetailInfo from './DetailInfo';

interface Props {
  filterParams: TransactionsParams;
}

const HistoryTable: FunctionComponent<Props> = ({ filterParams }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, loading } = useRequest<WalletAccountTransactionResponse>(
    () => getTransaction({ ...filterParams, pageNumber, pageSize: 10 }),
    {
      defaultParams: [filterParams],
      refreshDeps: [pageNumber, filterParams],
    },
  );

  const columns: ColumnsType<WalletAccountTransactionItem> = [
    {
      title: 'Coin',
      dataIndex: 'currencyName',
      key: 'currencyName',
      render: (_, { tradeType, fiatCurrency, currencyName }) => (
        <span>
          {tradeType === TradeType.Deposit || tradeType === TradeType.Transfer
            ? currencyName
            : fiatCurrency}
        </span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'tradeType',
      key: 'tradeType',
      render: (_, { tradeType }) => <span>{getTradeType(tradeType)}</span>,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        return (
          <span className={getStatusClass(status)}>{getStatus(status)}</span>
        );
      },
    },
    {
      title: 'Date & Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_, { createTime }) => (
        <span>{dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: WalletAccountTransactionItem) => (
        <ConfigProvider
          theme={{
            components: {
              Popover: {
                colorBgElevated: '#202B4B',
              },
            },
          }}
        >
          <Popover
            trigger="click"
            placement="topRight"
            content={<DetailInfo record={record} />}
          >
            <Button type="link" className="!text-[#63BCFF] px-0">
              Details
            </Button>
          </Popover>
        </ConfigProvider>
      ),
    },
  ];

  const handlePageChange = useCallback((page: number) => {
    // Handle page change if needed
    setPageNumber(page);
  }, []);

  return (
    <div className="w-full">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: '#272831',
              headerColor: 'rgba(255, 255, 255, 0.85)',
              headerSplitColor: 'transparent',
              colorPrimary: '#ADB1B8',
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data?.list ?? []}
          rowKey="id"
          loading={loading}
          size="middle"
          pagination={{
            size: 'default',
            current: pageNumber,
            pageSize: data?._meta.perPage,
            total: data?._meta.totalCount ?? 0,
            onChange: handlePageChange,
          }}
          className="black-gradient-bg4"
        />
      </ConfigProvider>
    </div>
  );
};

export default HistoryTable;
