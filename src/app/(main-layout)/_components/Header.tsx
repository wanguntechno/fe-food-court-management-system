'use client';

import Link from 'next/link';

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { Bell, Gauge } from 'lucide-react';

import ProfileMenu from '@/app/_components/ProfileMenu';
import useTenantInfo from '@/lib/hooks/useTentantInfo';

const Header = () => {
  const { data: tenant } = useTenantInfo();

  return (
    <nav className="felx fixed top-0 w-full bg-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-8 px-6 py-2">
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
            <Link href="/dashboard">
              <MenuItem>
                <ListItemIcon>
                  <Gauge size={20} />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            </Link>
          </ProfileMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
