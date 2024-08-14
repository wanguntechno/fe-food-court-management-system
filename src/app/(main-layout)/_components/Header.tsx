'use client';

import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Bell, CircleGauge } from 'lucide-react';

import useUserInfo from '@lib/hooks/useUserInfo';
import useTenantInfo from '@/lib/hooks/useTentantInfo';

const Header = () => {
  const { data } = useUserInfo();
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
            <IconButton
              size="small"
              variant="outlined"
              color="primary"
              LinkComponent={Link}
              href="/dashboard/home"
            >
              <CircleGauge />
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
      </div>
    </nav>
  );
};

export default Header;
