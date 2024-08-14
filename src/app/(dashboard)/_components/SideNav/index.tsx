'use client';

import IconButton from '@mui/material/IconButton';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getIsSideNavOpen, toggleSideNav } from '@/lib/redux/slice/navigation';

import NavListClose from './NavListClose';
import NavListOpen from './NavListOpen';

const SideNav = () => {
  const dispatch = useAppDispatch();
  const isSideNavOpen = useAppSelector(getIsSideNavOpen);

  return (
    <motion.nav
      animate={{
        width: isSideNavOpen ? '320px' : '90px',
      }}
      className={`fixed left-0 top-0 z-[99] h-screen overflow-visible border-r border-gray-200 p-4 ${isSideNavOpen ? 'px-6' : 'px-2'}`}
    >
      <motion.div
        className="absolute right-0 z-10 h-fit w-fit"
        animate={{
          x: '50%',
          rotate: isSideNavOpen ? 180 : 0,
        }}
      >
        <IconButton
          size="small"
          variant="outlined"
          color="gray"
          className="border-gray-300 bg-white p-1 text-gray-400 hover:bg-gray-50"
          onClick={() => dispatch(toggleSideNav())}
        >
          <ChevronRight size={20} />
        </IconButton>
      </motion.div>

      {isSideNavOpen ? <NavListOpen /> : <NavListClose />}
    </motion.nav>
  );
};

export default SideNav;
