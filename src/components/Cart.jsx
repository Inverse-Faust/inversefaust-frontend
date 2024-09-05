import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = id => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="absolute right-12 top-12 w-72 max-h-96 bg-white shadow-lg p-4 overflow-y-auto z-20 rounded-lg">
      {' '}
      {/* CartIcon 바로 오른쪽에 맞춰서 위치 */}
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
                    <span className="font-semibold">{item.title}</span> -{' '}
                    {item.timeSpent} - {item.purpose}
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
    </div>
  );
};

export default Cart;
