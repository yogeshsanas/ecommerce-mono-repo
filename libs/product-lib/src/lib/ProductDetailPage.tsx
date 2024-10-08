import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../libs/state-management/src/lib/store'; // Update the path
import { Star } from 'lucide-react';
import { addItem } from '../../../../libs/cart-lib/src/lib/cartSlice';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    // Ensure that the 'id' from the URL is a number
    const productId = id ? parseInt(id, 10) : undefined;

    // Find the product by its ID
    const product = useSelector((state: RootState) =>
        state.product.items.find((product) => product.id === productId)
    );

    const dispatch = useDispatch(); // Use dispatch for adding to cart

    // Handle adding the product to the cart
    const handleAddToCart = () => {
        if (product) { // Check if product is defined before accessing its properties
            dispatch(addItem({
                id: product.id.toString(),
                name: product.name,
                image: product.images[0]?.url || '/api/placeholder/400/400',
                selectedQuantity: '1', // This can remain as '1' since it's the initial selection
                quantity: 1, // Set this as needed, usually 1 for clothing items
                price: product.price,
                // Remove 'quantities' from here as it's no longer part of the CartItem
            }));
        }
    };

    // If the product is not found or id is undefined, return a message
    if (!product) {
        return <div className="text-center text-red-500">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Product Detail Container */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={product.images[0]?.url || '/api/placeholder/400/400'}
                            alt={product.name}
                            className="w-full lg:w-96 h-96 object-cover rounded-lg"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        {/* Price */}
                        <p className="text-2xl font-semibold text-gray-900 mb-4">
                            ${product.price}
                        </p>

                        {/* Description */}
                        <p className="text-gray-700 mb-6">{product.description}</p>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="ml-2 text-lg text-gray-600">{product.rating} / 5</span>
                        </div>

                        {/* Available Colors */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Available Colors</h3>
                            <div className="flex gap-2">
                                {product.colors.map((color, index) => (
                                    <div
                                        key={`${product.id}-color-${index}`} // Use a combination for uniqueness
                                        className="w-8 h-8 rounded-full"
                                        style={{
                                            backgroundColor: color.hexCode || '#000', // Use a default color if hexCode is not valid
                                        }}
                                        title={color.name} // Add tooltip for color name
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Available Sizes */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Available Sizes</h3>
                            <div className="flex gap-4">
                                {product.sizes.map((size) => (
                                    <span
                                        key={size}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-600"
                                    >
                                        {size}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button onClick={handleAddToCart} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Additional Product Information */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>Stock: {product.stock}</li>
                        <li>
                            Discount: {product.discount ? `${product.discount.value}%` : 'No discount available'}
                        </li>
                        {/* Render shipping details safely */}
                        <li>
                            Shipping (Standard): {product.shipping?.standard || 'N/A'}
                        </li>
                        <li>
                            Shipping (Express): {product.shipping?.express || 'N/A'}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
