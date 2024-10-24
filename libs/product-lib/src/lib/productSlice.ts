import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../../api-client-lib/src/lib/api-client-lib'; // Adjust path as necessary

// Define the types for complex product attributes
interface Color {
  name: string;
  hexCode: string;
}

interface Discount {
  value: number;
  type: 'percentage' | 'fixed'; // Example types: percentage or fixed discount
}

interface Image {
  url: string;
  alt: string;
}

interface Shipping {
  standard: string;
  express: string;
}

// Extended Product Interface
export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  description: string;
  price: number;
  currency: string;
  sizes: string[];
  colors: Color[];
  stock: number;
  discount: Discount | null; // Can be null if no discount applies
  rating: number;
  reviews: number;
  images: Image[];
  availability: string;
  shipping: Shipping | null;
}

// ProductState Interface
export interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial State
const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
};

/*export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    const response = await getProducts();
    console.log(response.data); // Inspect the API response
    return response.data.products; // Return the products array
  }
);*/

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts(); // Make sure this fetches the correct data
      console.log('API Response:', response); // Log to inspect
      return response.products; // Return the products array from the response
    } catch (error) {
      console.error('Error fetching products:', error); // Log error for debugging
      return rejectWithValue('Failed to fetch products'); // Provide a descriptive error message
    }
  }
);


// Product Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// Export the reducer
export default productSlice.reducer;
