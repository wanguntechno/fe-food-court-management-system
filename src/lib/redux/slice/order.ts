import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { ProductType } from '@/lib/react-query/service/products/product.type';

interface State {
  orders: ProductType[];
}

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
  } as State,
  reducers: {
    addOrder: (state: State, action: PayloadAction<ProductType>) => {
      if (_.some(state.orders, { uuid: action.payload.uuid })) {
        return state;
      }
      return {
        ...state,
        orders: [...state.orders, { ...action.payload, quantity: 1 }],
      };
    },
    removeOrder: (state: State, action: PayloadAction<number>) => {
      return {
        ...state,
        orders: state.orders.filter((__, i) => i !== action.payload),
      };
    },
    clearOrders: (state: State) => {
      return {
        ...state,
        orders: [],
      };
    },
    setQuantity: (state: State, action: PayloadAction<{ index: number; quantity: number }>) => {
      const { index, quantity } = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.orders[index].quantity = quantity;
    },
  },
});

export const { addOrder, removeOrder, clearOrders, setQuantity } = orderSlice.actions;

export const getOrders = (state: { order: State }) => state.order.orders;

export default orderSlice.reducer;
