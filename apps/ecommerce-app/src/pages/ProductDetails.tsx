import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2>Product Details for ID: {id}</h2>
      {/* Your product details logic goes here */}
    </div>
  );
};

export default ProductDetails;
