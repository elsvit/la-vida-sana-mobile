import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EStateName} from '../types';
import {IStateCart} from './types';

const initialState: IStateCart = {
  items: {},
};

export const cartSlice = createSlice({
  name: EStateName.cart,
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ productId: string; qty?: number; price?: number }>,
    ) => {
      const { productId, qty = 1, price } = action.payload;
      const existing = state.items[productId];
      const nextQty = (existing?.qty || 0) + qty;
      state.items[productId] = { productId, qty: nextQty, price: price ?? existing?.price };
      if (state.items[productId].qty <= 0) delete state.items[productId];
    },
    removeItem: (state, action: PayloadAction<{ productId: string }>) => {
      delete state.items[action.payload.productId];
    },
    setQty: (
      state,
      action: PayloadAction<{ productId: string; qty: number; price?: number }>,
    ) => {
      const { productId, qty, price } = action.payload;
      if (qty <= 0) {
        delete state.items[productId];
      } else {
        state.items[productId] = { productId, qty, price: price ?? state.items[productId]?.price };
      }
    },
    clearCart: state => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, setQty, clearCart } = cartSlice.actions;
