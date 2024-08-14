import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { Minus, Plus } from 'lucide-react';
import { Control, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

import ControllWrapper from '@/components/ui/form/form-control-wrapper';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getOrders, setQuantity } from '@/lib/redux/slice/order';

interface Props {
  max?: number;
  orderIndex: number;
}

const PlusMinuInput = ({ max, orderIndex }: Props) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(getOrders)[orderIndex];

  const handleIncrement = () => {
    if (max && order.quantity >= max) return;
    dispatch(setQuantity({ index: orderIndex, quantity: order.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (order.quantity <= 1) return;
    dispatch(setQuantity({ index: orderIndex, quantity: order.quantity - 1 }));
  };

  return (
    <div className="flex items-center gap-1">
      <IconButton
        variant="outlined"
        className="h-fit"
        color="primary"
        size="small"
        onClick={() => handleDecrement()}
      >
        <Minus />
      </IconButton>

      <TextField
        hiddenLabel
        onChange={(e) => {
          if (e.target.value.match(/[^0-9]/g)) return;

          const newQuantity = Number(e.target.value);

          if (max && newQuantity > max) {
            dispatch(setQuantity({ index: orderIndex, quantity: max }));
            return;
          }

          dispatch(setQuantity({ index: orderIndex, quantity: newQuantity }));
        }}
        value={order.quantity}
        inputProps={{
          className: '!p-0 w-12 h-10 text-center',
        }}
      />

      <IconButton
        variant="outlined"
        className="h-fit"
        color="primary"
        size="small"
        onClick={() => handleIncrement()}
      >
        <Plus />
      </IconButton>
    </div>
  );
};

export default PlusMinuInput;
