import { TransactionsParams } from '@/services/wallet/account';
import { DatePicker, Form, Select } from 'antd';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import {
  CurrencyTypeOptions,
  StatusOptions,
  TradeTypeOptions,
} from '../../utils/constants';

interface Props {
  onValuesChange?: (
    changedValues: { [key: string]: string },
    values: TransactionsParams,
  ) => void;
}

const HistoryFilter: FunctionComponent<Props> = ({ onValuesChange }) => {
  const [form] = Form.useForm<TransactionsParams>();

  const handleValuesChange = (
    changedValues: { [key: string]: string },
    values: TransactionsParams & { timeRange?: [dayjs.Dayjs, dayjs.Dayjs] },
  ) => {
    const { timeRange, ...restProps } = values;

    if (onValuesChange) {
      onValuesChange(changedValues, {
        ...restProps,
        startTime: timeRange ? timeRange?.[0].valueOf() : undefined,
        endTime: timeRange ? timeRange?.[1].endOf('day').valueOf() : undefined,
      });
    }
  };

  return (
    <div className="flex items-start">
      <Form
        colon={false}
        form={form}
        variant="filled"
        className="register-form-layout"
        size="middle"
        onValuesChange={handleValuesChange}
        initialValues={{ coin: '', tradeType: '', status: '' }}
      >
        <div className="grid grid-cols-[0.8fr_1.4fr_0.8fr_1.5fr] gap-[24px]">
          <Form.Item name={'coin'} label={'Coin'}>
            <Select options={CurrencyTypeOptions} />
          </Form.Item>
          <Form.Item name={'tradeType'} label={'Transaction Type'}>
            <Select options={TradeTypeOptions} />
          </Form.Item>
          <Form.Item name={'status'} label={'Status'}>
            <Select options={StatusOptions} />
          </Form.Item>
          <Form.Item name="timeRange" label={'Date'}>
            <DatePicker.RangePicker />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default HistoryFilter;
