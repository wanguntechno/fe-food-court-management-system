import { CardProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

import ImageContainer from '@/components/ImageContainer';
import { ProductType } from '@/lib/react-query/service/products/product.type';
import { cn } from '@/lib/utils';
import formatToRp from '@/lib/utils/formatToRp';

interface Props extends CardProps {
  product: ProductType;
  selected?: boolean;
}

const ProductCard = ({ product, className, selected, ...props }: Props) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="h-fit">
      <Card
        {...props}
        className={cn(
          '!pointer-events-auto flex cursor-pointer flex-col rounded-2xl p-2 transition-all duration-200 hover:drop-shadow-lg',
          className,
        )}
        variant="outlined"
      >
        <ImageContainer
          src={product.photo ? product.photo.url : ''}
          alt=""
          className="aspect-h-1 aspect-w-1 rounded-xl"
        >
          {selected && (
            <div className="flex h-full w-full items-center justify-center bg-primary-300/75 text-white">
              <CircleCheck size={60} />
            </div>
          )}
        </ImageContainer>
        <CardContent className="!p-2">
          <Typography className="truncate text-sm" variant="body1">
            {product.name}
          </Typography>
          <div className="flex w-full items-center justify-between">
            <Typography variant="body1" fontWeight={600}>
              {formatToRp(product.price)}
            </Typography>
            <Typography variant="body2">{product.available_stock}</Typography>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
