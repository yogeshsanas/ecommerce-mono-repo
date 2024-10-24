import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../../../../libs/cart-lib/src/lib/Cart';
import Payment from '../../../../libs/payment-lib/src/lib/Payment';
import Login from '../../../../libs/auth-lib/src/lib/Login'
import UserProfile from '../../../../libs/user-lib/src/lib/UserProfile'
import ProductDetailPage from '../../../../libs/product-lib/src/lib/ProductDetailPage';
import Navbar from '../../../../libs/shared-ui/src/lib/Navbar'

export function App() {
  return (
    <div>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/userProfile' element={<UserProfile />} />
      </Routes>
    </div>

  );
}

export default App;
