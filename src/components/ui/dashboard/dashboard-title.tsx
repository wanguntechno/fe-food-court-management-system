import { HTMLProps } from 'react';

import Typography from '@mui/material/Typography';

import Breadcrumbs from './breadcrumbs';

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
}

const DashboardTitle = ({ breadcrumbs, title }: Props) => {
  return (
    <div className="w-fit">
      <Typography variant="h5" className="mb-2 font-bold">
        {title}
      </Typography>

      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
  );
};

export default DashboardTitle;
