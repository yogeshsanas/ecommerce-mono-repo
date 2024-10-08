import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import ProductDetailPage from '../../../../libs/product-lib/src/lib/ProductDetailPage';
import Navbar from '../../../../libs/shared-ui/src/lib/Navbar'

export function App() {
  return (
    <div>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        {/* Update this line to use a dynamic id parameter */}
        <Route path='/product/:id' element={<ProductDetailPage />} />
      </Routes>
    </div>

  );
}

export default App;
