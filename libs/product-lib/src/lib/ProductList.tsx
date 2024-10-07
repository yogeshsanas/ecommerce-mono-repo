import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../product-lib/src/lib/productSlice';
import { RootState ,AppDispatch} from '../../../state-management/src/lib/store';

const ProductList = () => {
    const dispatch: AppDispatch = useDispatch();
    const products = useSelector((state: RootState) => state.product.items);
    const status = useSelector((state: RootState) => state.product.status);
    const error = useSelector((state: RootState) => state.product.error);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProducts());
      }
    }, [dispatch, status]);
  
  return (
    <div>
      <h1>Product List</h1>
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p>Error loading products: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.currency} {product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Rating: {product.rating} ({product.reviews} reviews)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
