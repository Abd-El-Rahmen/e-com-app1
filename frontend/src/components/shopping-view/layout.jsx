import React from 'react';
import { Outlet } from 'react-router-dom';
import ShooppingViewHeader from './header';

const ShooppingViewLayout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      {/* Shopping View Header */}
      <ShooppingViewHeader />

      {/* Main Content */}
      <div className="flex-1 w-full p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ShooppingViewLayout;
