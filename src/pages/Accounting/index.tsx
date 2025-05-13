import React from 'react';
import { Outlet } from 'react-router-dom';
import { AccountingNav } from '../../components/AccountingNav';

export const Accounting: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <AccountingNav />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};