'use client';

import Link from 'next/link';

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { BadgeDollarSign, Bell } from 'lucide-react';

import ProfileMenu from '@/app/_components/ProfileMenu';
import useTenantInfo from '@/lib/hooks/useTentantInfo';

const DashboardHeader = () => {
  const { data: tenant } = useTenantInfo();

  return (
    <nav className="x-12 sticky top-0 z-50 flex w-full items-center justify-between gap-8 bg-white/50 px-6 py-2 backdrop-blur backdrop-filter">
      <Link href="/">
        <Typography variant="h5" className="text-primary">
          {tenant?.name}
        </Typography>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <IconButton size="small" variant="outlined" color="primary">
            <Bell />
          </IconButton>
        </div>

        <ProfileMenu>
          <Link href="/">
            <MenuItem>
              <ListItemIcon>
                <BadgeDollarSign size={20} />
              </ListItemIcon>
              Cashier
            </MenuItem>
          </Link>
        </ProfileMenu>
      </div>
    </nav>
  );
};

export default DashboardHeader;
