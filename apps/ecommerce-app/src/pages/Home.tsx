import React from 'react';
import { ChevronRight, Star, ShoppingCart } from 'lucide-react';

const categories = [
  { name: 'Electronics', image: '/api/placeholder/100/100' },
  { name: 'Clothing', image: '/api/placeholder/100/100' },
  { name: 'Home & Garden', image: '/api/placeholder/100/100' },
  { name: 'Sports', image: '/api/placeholder/100/100' },
];

const featuredProducts = [
  { name: 'Wireless Earbuds', price: 79.99, rating: 4.5, image: '/api/placeholder/200/200' },
  { name: 'Smart Watch', price: 199.99, rating: 4.2, image: '/api/placeholder/200/200' },
  { name: 'Laptop', price: 999.99, rating: 4.8, image: '/api/placeholder/200/200' },
  { name: 'Running Shoes', price: 89.99, rating: 4.3, image: '/api/placeholder/200/200' },
];

const HomePage = () => {
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
          {featuredProducts.map((product) => (
            <div key={product.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-700 transition duration-300">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;