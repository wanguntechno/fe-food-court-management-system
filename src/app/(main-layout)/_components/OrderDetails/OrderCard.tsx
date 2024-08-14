import { memo } from 'react';

import Card, { CardProps } from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { Trash2 } from 'lucide-react';

import PlusMinuInput from '@/app/(main-layout)/_components/OrderDetails/PlusMinusInput';
import ImageContainer from '@/components/ImageContainer';
import { ProductType } from '@/lib/react-query/service/products/product.type';
import { useAppDispatch } from '@/lib/redux/hooks';
import { removeOrder } from '@/lib/redux/slice/order';
import formatToRp from '@/lib/utils/formatToRp';

interface Props extends CardProps {
  product: ProductType;
  orderIndex: number;
}

const OrderCard = ({ product, orderIndex, ...props }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Card variant="outlined" className="flex w-full justify-between gap-2 p-2" {...props}>
      <div className="flex gap-2">
        <div>
          <ImageContainer
            src={product.photo ? product.photo.url : ''}
            alt={product.name}
            className="aspect-h-1 aspect-w-1 w-12 rounded"
          >
            <button
              type="button"
              className="flex h-full w-full cursor-pointer items-center justify-center bg-red-300/75 text-white opacity-0 duration-100 hover:opacity-100"
              onClick={() => dispatch(removeOrder(orderIndex))}
              aria-label="Delete"
            >
              <Trash2 />
            </button>
          </ImageContainer>
        </div>
        <div>
          <Typography variant="body1">{product.name}</Typography>
          <Typography className="font-semibold" variant="body1">
            {formatToRp(product.price)}
          </Typography>
        </div>
      </div>

      <PlusMinuInput orderIndex={orderIndex} max={product.available_stock} />
    </Card>
  );
};

export default memo(OrderCard);
