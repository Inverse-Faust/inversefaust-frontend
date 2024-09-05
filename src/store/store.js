// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // 예시로 장바구니 리듀서를 사용
import messageReducer from './messageSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer, // 다른 리듀서를 추가할 수 있습니다.
    messages: messageReducer,
  },
});

export default store;
