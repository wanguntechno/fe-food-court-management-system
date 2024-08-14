import { ChartBarBig, Package } from 'lucide-react';

export interface OverViewItem {
  label: string;
  pathname: string;
  icon: any;
}

export interface NavItem {
  title: string;
  items: OverViewItem[];
}

const OVERVVIEW_ITEMS = [
  {
    label: 'Analytics',
    pathname: '/dashboard/home',
    icon: ChartBarBig,
  },
];

const MANAGEMENT_ITEMM = [
  {
    label: 'Product',
    pathname: '/dashboard/product',
    icon: Package,
  },
];

const NAV_ITEMS: NavItem[] = [
  {
    title: 'Overview',
    items: OVERVVIEW_ITEMS,
  },
  {
    title: 'Management',
    items: MANAGEMENT_ITEMM,
  },
];

export default NAV_ITEMS;
