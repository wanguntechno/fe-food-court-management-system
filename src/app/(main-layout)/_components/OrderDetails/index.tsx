import { memo, useCallback } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import _ from 'lodash';

import { useAppSelector } from '@/lib/redux/hooks';
import { getOrders } from '@/lib/redux/slice/order';
import formatToRp from '@/lib/utils/formatToRp';

import OrderCard from './OrderCard';

const OrderDetails = () => {
  const orders = useAppSelector(getOrders);

  const calcSubTotal = useCallback(() => {
    return _.sumBy(orders, (order) => order.price * order.quantity);
  }, [orders]);

  const calcTotal = useCallback(() => {
    return _.sumBy(orders.map((e) => e.selling_price * e.quantity));
  }, [orders]);

  const calcTax = useCallback(() => {
    return _.sumBy(orders.map((e) => (e.selling_price - e.price) * e.quantity));
  }, [orders]);

  return (
    <Card variant="outlined" className="flex min-w-[500px] flex-col rounded-2xl bg-white p-6">
      <Typography variant="h4">Orders</Typography>

      <div className="mt-4 flex h-full flex-col gap-2">
        {orders.map((item, i) => (
          <OrderCard key={item.uuid} product={item} orderIndex={i} />
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Typography variant="body1">Sub Total</Typography>
          <Typography variant="body1" fontWeight={700}>
            {formatToRp(calcSubTotal())}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="body1">Tax</Typography>
          <Typography variant="body1" fontWeight={700}>
            {formatToRp(calcTax())}
          </Typography>
        </div>

        <Divider />

        <div className="flex items-center justify-between">
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1" fontWeight={700}>
            {formatToRp(calcTax() + calcTotal())}
          </Typography>
        </div>

        <Button variant="contained" className="mt-4 w-full py-2">
          <Typography variant="h6">CHECK OUT</Typography>
        </Button>
      </div>
    </Card>
  );
};

export default memo(OrderDetails);
