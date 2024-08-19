import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';

import { LogOut } from 'lucide-react';

import Menu from '@/components/mui/menu';
import useUserInfo from '@/lib/hooks/useUserInfo';

const ProfileMenu = ({ children }: { children: React.ReactNode }) => {
  const { data } = useUserInfo();

  return (
    <Menu
      Button={Button}
      buttonProps={{
        children: (
          <>
            <Avatar className="border border-primary bg-transparent uppercase text-primary">
              {data?.username?.[0]}
            </Avatar>
            {data?.username}
          </>
        ),
        className: 'gap-2',
      }}
      PaperProps={{
        className: 'min-w-40',
      }}
    >
      {children}
      <Divider className="my-1" />
      <MenuItem>
        <ListItemIcon>
          <LogOut size={20} />
        </ListItemIcon>
        Log-Out
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
