// Layout.tsx
import React, { ReactNode } from 'react';
import Sidebar from '@/components/shared/sidebar';
import MobileSideBar from '@/components/shared/mobile-sidebar';

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='relative h-full'>
      <div className='md:w-84 z-[40] hidden h-full bg-[#F9FAFE] md:fixed md:inset-y-0 md:flex md:flex-col'>
        <Sidebar />
      </div>
      <div className='flex md:hidden'>
        <MobileSideBar />
      </div>
      <main>
        {children}
      </main>
      
    </div>
  );
};

export default DashboardLayout;
