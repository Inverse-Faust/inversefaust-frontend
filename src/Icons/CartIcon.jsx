import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';

const CartIcon = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleIconClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="relative flex flex-col items-start">
      <div onClick={handleIconClick} style={{ cursor: 'pointer' }}>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: 'pointer' }}
        >
          <path
            d="M9.375 20.75C9.375 21.1208 9.26503 21.4834 9.059 21.7917C8.85298 22.1 8.56014 22.3404 8.21753 22.4823C7.87492 22.6242 7.49792 22.6613 7.1342 22.589C6.77049 22.5166 6.4364 22.338 6.17417 22.0758C5.91195 21.8136 5.73337 21.4795 5.66103 21.1158C5.58868 20.7521 5.62581 20.3751 5.76773 20.0325C5.90964 19.6899 6.14996 19.397 6.45831 19.191C6.76665 18.985 7.12916 18.875 7.5 18.875C7.99728 18.875 8.47419 19.0725 8.82582 19.4242C9.17745 19.7758 9.375 20.2527 9.375 20.75ZM17.25 18.875C16.8792 18.875 16.5166 18.985 16.2083 19.191C15.9 19.397 15.6596 19.6899 15.5177 20.0325C15.3758 20.3751 15.3387 20.7521 15.411 21.1158C15.4834 21.4795 15.662 21.8136 15.9242 22.0758C16.1864 22.338 16.5205 22.5166 16.8842 22.589C17.2479 22.6613 17.6249 22.6242 17.9675 22.4823C18.3101 22.3404 18.603 22.1 18.809 21.7917C19.015 21.4834 19.125 21.1208 19.125 20.75C19.125 20.2527 18.9275 19.7758 18.5758 19.4242C18.2242 19.0725 17.7473 18.875 17.25 18.875ZM22.0753 7.58094L19.5169 15.8966C19.3535 16.4343 19.0211 16.9051 18.569 17.239C18.1169 17.5729 17.5692 17.7521 17.0072 17.75H7.77469C7.2046 17.7482 6.65046 17.5616 6.1953 17.2183C5.74015 16.8751 5.40848 16.3936 5.25 15.8459L2.04469 4.625H1.125C0.826631 4.625 0.540483 4.50647 0.329505 4.2955C0.118526 4.08452 0 3.79837 0 3.5C0 3.20163 0.118526 2.91548 0.329505 2.7045C0.540483 2.49353 0.826631 2.375 1.125 2.375H2.32687C2.73407 2.37626 3.12988 2.50951 3.45493 2.75478C3.77998 3.00004 4.01674 3.34409 4.12969 3.73531L4.81312 6.125H21C21.1761 6.12499 21.3497 6.1663 21.5069 6.24561C21.664 6.32492 21.8004 6.44001 21.905 6.58164C22.0096 6.72326 22.0795 6.88746 22.1091 7.06102C22.1387 7.23458 22.1271 7.41266 22.0753 7.58094ZM19.4766 8.375H5.45531L7.41375 15.2281C7.43617 15.3065 7.48354 15.3755 7.54867 15.4245C7.6138 15.4736 7.69315 15.5001 7.77469 15.5H17.0072C17.0875 15.5002 17.1656 15.4746 17.2303 15.427C17.2949 15.3794 17.3426 15.3123 17.3662 15.2356L19.4766 8.375Z"
            fill="black"
          />
        </svg>
      </div>

      {isCartOpen && (
        <div className="absolute right-0 top-full">
          <Cart />
        </div>
      )}
    </div>
  );
};

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemove = id => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-20 rounded-lg border mt-2">
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
                    <span className="font-semibold">{item.title} </span>
                    {item.timeSpent} 시간 {item.purpose}
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

export default CartIcon;
