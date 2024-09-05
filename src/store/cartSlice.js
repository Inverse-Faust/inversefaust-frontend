// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // 액션의 payload를 카트에 추가
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // 주어진 id와 일치하는 항목을 제거
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
