import { configureStore } from '@reduxjs/toolkit';
import { saveState } from './storage';
import userSlice, { JWT_PERSISTENS_STATE } from './user.slice';
import cartSlice, { CART_PERSISTENS_STATE } from './cart.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENS_STATE);
  saveState(store.getState().cart, CART_PERSISTENS_STATE);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
