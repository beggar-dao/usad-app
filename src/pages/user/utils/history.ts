import { Status } from './constants';

export const getTradeType = (type?: number) => {
  switch (type) {
    case 1:
      return 'Deposit';
    case 2:
      return 'Transfer';
    case 3:
      return 'Buy';
    case 4:
      return 'Fiat Withdrawal';
    default:
      return 'Unknown';
  }
};

export const getStatus = (status?: number) => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Approved';
    case 2:
      return 'Rejected';
    case 3:
      return 'Successful';
    case 4:
      return 'Failed';
    default:
      return 'Unknown';
  }
};

export const getStatusClass = (status?: number) => {
  switch (status) {
    case Status.Pending:
      return 'text-yellow-500';
    case Status.Approved:
      return 'text-[#6ECE82]';
    case Status.Rejected:
      return 'text-[#FF2121]';
    case Status.Success:
      return 'text-[#6ECE82]';
    case Status.Failed:
      return 'text-[#FF2121]';
    default:
      return 'text-gray-500';
  }
};
