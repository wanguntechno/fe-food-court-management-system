import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '@mui/material/Button';
import Typograhy from '@mui/material/Typography';

import { OverViewItem } from '../nav_items';

const NavButton = ({ item }: { item: OverViewItem }) => {
  const pathname = usePathname();

  return (
    // <Link href={item.pathname}>
    <Button
      variant={pathname === item.pathname ? 'ghost' : 'text'}
      color={pathname === item.pathname ? 'primary' : 'gray'}
      className="w-full flex-col px-4 py-3"
      LinkComponent={Link}
      href={item.pathname}
    >
      <Typograhy variant="body1" className="flex flex-col items-center gap-1 px-2 text-xs">
        <item.icon size="1.2rem" />
        {item.label}
      </Typograhy>
    </Button>
    // </Link>
  );
};

export default NavButton;
