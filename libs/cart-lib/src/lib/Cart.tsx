import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import {
  updateQuantity,
  removeItem,
  selectCartItems,
  selectCartTotal,
  CartItem
} from './cartSlice';
import {
  setUser,
  selectIsAuthenticated,
  selectCurrentUser,
  User
} from '../../../auth-lib/src/lib/authSlice';
import Button from '../../../shared-ui/src/lib/Button';
import Input from '../../../shared-ui/src/lib/Input';
import apiClient from '../../../api-client-lib/src/lib/api-client-lib';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        {children}
        <Button onClick={onClose} className="mt-4 w-full">Close</Button>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [otp, setOtp] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' });
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity.toString() }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleProceedToCheckout = () => {
    if (isVerified) {
      navigate('/payment');
    } else {
      setShowSignIn(true);
    }
  };

  const handleCreateAccount = () => {
    setShowCreateAccount(true);
    setShowSignIn(false);
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendOtpToEmail = (email: string) => {
    apiClient.post('/send-otp', { email })
      .then(response => {
        console.log(`OTP sent to ${email}`);
      })
      .catch(error => {
        console.error("Error sending OTP:", error);
      });
  };

  const handleOTPVerification = () => {
    if (!/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      dispatch(setUser({
        name: userInfo.name,
        email: userInfo.email
      }));

      // Set verification status
      setIsVerified(true);

      // Clear all modals
      setShowOTP(false);
      setShowSignIn(false);
      setShowCreateAccount(false);
      setError(null);

      // Navigate to payment page
      navigate('/payment');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleAccountSubmit = () => {
    if (!userInfo.name || !userInfo.email) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(userInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }

    console.log('Simulating OTP sent to:', userInfo.email);
    setShowCreateAccount(false);
    setShowOTP(true);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">Your Shopping Cart</h2>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item: CartItem) => (
            <li key={item.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover mr-4" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{(item.price * item.quantity).toFixed(2)} for {item.quantity} item(s)
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded-md"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-md"
                  >
                    +
                  </button>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
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
        <Button
          onClick={handleProceedToCheckout}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {isVerified ? 'Proceed to Payment' : 'Proceed to Checkout'}
        </Button>
      </div>

      {/* Sign In Modal */}
      <Modal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <p className="mb-4">Please sign in to continue with your purchase.</p>
        <Button onClick={handleCreateAccount} className="bg-gray-300 text-black w-full px-4 py-2 rounded mt-4">
          Create Account
        </Button>
      </Modal>

      {/* Create Account Modal */}
      <Modal isOpen={showCreateAccount} onClose={() => setShowCreateAccount(false)}>
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Input
          type="text"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          className="border border-gray-300 px-2 py-1 rounded mb-4"
          placeholder="Name"
        />
        <Input
          type="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          className="border border-gray-300 px-2 py-1 rounded mb-4"
          placeholder="Email"
        />
        <Input
          type="password"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          className="border border-gray-300 px-2 py-1 rounded mb-4"
          placeholder="Password"
        />
        <Button onClick={handleAccountSubmit} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Submit
        </Button>
      </Modal>

      {/* OTP Modal */}
      <Modal isOpen={showOTP} onClose={() => setShowOTP(false)}>
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p className="mb-4">We've sent an OTP to {userInfo.email}. Please enter it below.</p>
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded mb-4"
          placeholder="Enter OTP"
        />
        <Button onClick={handleOTPVerification} className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Verify OTP
        </Button>
      </Modal>
    </div>
  );
};

export default Cart;