import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { updateQuantity, removeItem, selectCartItems, selectCartTotal } from '../../../../libs/cart-lib/src/lib/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);

  const handleUpdateQuantity = (id: string, newQuantity: string) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  // Add type definition for id (string)
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
                    ₹{item.quantities[item.selectedQuantity]?.price || 'N/A'} for {item.selectedQuantity} kg
                  </p>
                </div>
                <div className="flex items-center">
                  <select
                    value={item.selectedQuantity}
                    onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                    className="ml-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {Object.keys(item.quantities).map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity} kg
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    ₹{item.quantities[item.selectedQuantity]?.price || 'N/A'}
                  </p>
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
