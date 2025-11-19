import emptyDataImage from '@/assets/images/empty-data.png';
import React from 'react';

const Empty: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img
        src={emptyDataImage}
        alt="No data"
        className="w-32 h-32 mb-4 opacity-50"
      />
      <p className="text-gray-500 text-base">No history yet...</p>
    </div>
  );
};

export default Empty;
