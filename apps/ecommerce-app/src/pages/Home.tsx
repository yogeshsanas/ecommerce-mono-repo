import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../libs/state-management/src/lib/store';
import { fetchProducts, Product } from '../../../../libs/product-lib/src/lib/productSlice';
import { ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addItem } from '../../../../libs/cart-lib/src/lib/cartSlice';

const categories = [
  { name: 'Electronics', image: '/api/placeholder/100/100' },
  { name: 'Clothing', image: '/api/placeholder/100/100' },
  { name: 'Home & Garden', image: '/api/placeholder/100/100' },
  { name: 'Sports', image: '/api/placeholder/100/100' },
];

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.items as Product[]);
  const productStatus = useSelector((state: RootState) => state.product.status);
  const productError = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleAddToCart = (product: Product) => {
    const itemToAdd = {
      id: product.id.toString(), // Ensure id is a string
      name: product.name,
      image: product.images[0]?.url || '/api/placeholder/400/400', // Default image if none available
      selectedQuantity: '1', // Default quantity; this could be made dynamic
      quantity: 1, // Adding quantity property
      price: product.price, // Directly use the price
    };
  
    dispatch(addItem(itemToAdd)); // Dispatch action to add item to cart
    alert(`${product.name} has been added to your cart!`); // Optionally, show a confirmation message
  };  

  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products);
    return <div>No products available.</div>; // Fallback UI
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-8">
        <img src="/api/placeholder/1200/400" alt="Hero" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Shop</h1>
            <p className="text-xl text-gray-200 mb-6">Discover amazing products at unbeatable prices</p>
            <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src={category.image} alt={category.name} className="w-full h-32 object-cover" />
              <div className="p-4 flex justify-between items-center">
                <h3 className="font-semibold">{category.name}</h3>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productStatus === 'loading' && <div>Loading...</div>}
          {productError && <div>Error: {productError}</div>}
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src={product.images[0].url} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">₹{product.price}</span> {/* Adjusted for currency */}
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <button onClick={() => handleAddToCart(product)} className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition duration-300">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
