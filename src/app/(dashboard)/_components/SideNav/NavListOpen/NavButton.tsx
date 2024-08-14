import { useMemo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '@mui/material/Button';
import Typograhy from '@mui/material/Typography';

import { OverViewItem } from '../nav_items';

const NavButton = ({ item }: { item: OverViewItem }) => {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    return pathname.startsWith(item.pathname);
  }, [pathname]);

  return (
    // <Link href={item.pathname}>
    <Button
      variant={isActive ? 'ghost' : 'text'}
      color={isActive ? 'primary' : 'gray'}
      className="w-full justify-start px-4 py-3"
      LinkComponent={Link}
      href={item.pathname}
    >
      <Typograhy variant="body1" className="flex items-center gap-3 font-normal">
        <item.icon size="1.2rem" />
        {item.label}
      </Typograhy>
    </Button>
    // </Link>
  );
};

export default NavButton;
