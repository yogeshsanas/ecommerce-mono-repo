import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { updateQuantity, removeItem, selectCartItems, selectCartTotal } from '../../../../libs/cart-lib/src/lib/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);

  // Increment quantity handler
  const handleIncrement = (id: string) => {
    dispatch(updateQuantity({ id, quantity: '1' })); // Increase quantity by 1
  };

  const handleDecrement = (id: string) => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem && currentItem.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: (currentItem.quantity - 1).toString() })); // Decrease quantity and convert to string
    } else {
      dispatch(removeItem(id)); // Remove item if quantity is 1 or less
    }
  };
  
  // Remove item handler
  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Your Shopping Cart</h2>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover mr-4" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} for {item.quantity} item(s) {/* Updated to use item.price directly */}
                  </p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDecrement(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">+</button>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">₹{item.price}</p> {/* Use item.price directly */}
                </div>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-4 p-2 rounded-full text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 py-5 sm:px-6 bg-gray-50">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-900">Total</p>
          <p className="text-lg font-bold text-gray-900">₹{totalPrice.toFixed(2)}</p>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
