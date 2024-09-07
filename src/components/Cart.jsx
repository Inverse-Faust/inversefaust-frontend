import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice'; // clearCart 액션 추가
import axios from 'axios';

const apiUrl = 'http://52.79.142.158'; // 혹은 https를 사용할 경우 'https://52.79.142.158'

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = id => {
    dispatch(removeFromCart(id));
  };

  // 전송 버튼을 클릭했을 때 Axios로 POST 요청
  const handleSend = async () => {
    try {
      const data = cartItems.map(cartItem => ({
        activityId: cartItem.activityId,
        activityDuration: cartItem.timeSpent, // timeSpent를 activityDuration으로 변경
        purpose: cartItem.purpose,
      }));
      // Axios로 POST 요청을 보내서 데이터를 전송
      await axios.post(`${apiUrl}/api/activity/user1`, data);
      dispatch(clearCart());
    } catch (error) {
      console.error('전송 실패:', error);
    }
  };

  return (
    <div className="absolute right-4 top-14 w-80 max-h-96 bg-white shadow-lg p-4 overflow-y-auto z-20 rounded-lg">
      <h2 className="text-xl font-bold mb-4">장바구니</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="mb-4">
              <div className="w-72 h-14 px-4 py-2.5 bg-white rounded-lg border-2 border-indigo-700 justify-between items-center gap-4 flex">
                <div className="flex items-center gap-2">
                  <div className="grow shrink basis-0 text-zinc-900 text-base font-normal leading-normal">
                    <span className="font-semibold">{item.title}</span> /{' '}
                    {item.timeSpent} 분 / {item.purpose}
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* 전송 버튼 */}
      {cartItems.length > 0 && (
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          onClick={handleSend} // 전송 버튼 클릭 시 Axios 호출
        >
          전송하기
        </button>
      )}
    </div>
  );
};

export default Cart;
