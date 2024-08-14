'use client';

import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Bell, House } from 'lucide-react';

import useUserInfo from '@lib/hooks/useUserInfo';
import useTenantInfo from '@/lib/hooks/useTentantInfo';

const DashboardHeader = () => {
  const { data } = useUserInfo();
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
          <IconButton size="small" variant="outlined" color="primary" LinkComponent={Link} href="/">
            <House />
          </IconButton>

          <IconButton size="small" variant="outlined" color="primary">
            <Bell />
          </IconButton>
        </div>

        <Button className="gap-2">
          <Avatar className="border border-primary bg-transparent uppercase text-primary">
            {data?.username?.[0]}
          </Avatar>
          {data?.username}
        </Button>
      </div>
    </nav>
  );
};

export default DashboardHeader;
