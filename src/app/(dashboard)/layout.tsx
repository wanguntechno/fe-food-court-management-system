'use client';

import { motion } from 'framer-motion';

import { useAppSelector } from '@/lib/redux/hooks';
import { getIsSideNavOpen } from '@/lib/redux/slice/navigation';

import DashboardHeader from './_components/Header';
import SideNav from './_components/SideNav';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const isSideNavOpen = useAppSelector(getIsSideNavOpen);

  return (
    <div className="flex min-h-screen w-full">
      <SideNav />
      <motion.div
        animate={{
          paddingLeft: isSideNavOpen ? '320px' : '90px',
        }}
        className="relative flex h-screen w-full flex-col"
      >
        <DashboardHeader />
        <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-grow flex-col gap-8 p-6 pb-16">
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default Layout;
