import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processPayment } from './PaymentSlice';
import { selectCartTotal } from '../../../cart-lib/src/lib/cartSlice';
import { selectCurrentUser } from '../../../auth-lib/src/lib/authSlice';

const Payment: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [selectedMethod, setSelectedMethod] = useState('card');

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card' },
    { id: 'upi', label: 'UPI' },
    { id: 'netbanking', label: 'Net Banking' },
    { id: 'wallet', label: 'Wallet' },
  ];

  const handlePayment = async () => {
    try {
      const result = await dispatch(processPayment({
          amount: totalAmount,
          paymentMethod: selectedMethod,
          orderId: `ORDER_${Date.now()}`,
      }))['unwrap'](); // Correctly using unwrap()

      if (result.transactionId) {
        navigate('/order-confirmation', {
          state: {
            transactionId: result.transactionId,
            amount: totalAmount,
          },
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          {paymentMethods.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedMethod(id)}
              className={`p-4 border rounded-lg transition-colors ${
                selectedMethod === id 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Order Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Order Total</span>
            <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium capitalize">{selectedMethod}</span>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Pay ₹{totalAmount.toFixed(2)}
      </button>
    </div>
  );
};

export default Payment;
