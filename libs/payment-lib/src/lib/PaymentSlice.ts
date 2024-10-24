import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { processPayment as apiProcessPayment } from '../../../api-client-lib/src/lib/api-client-lib'; // Adjust the path as necessary

interface PaymentState {
  loading: boolean;
  error: string | null;
  transactionId: string | null;
  status: 'idle' | 'processing' | 'success' | 'failed';
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  transactionId: null,
  status: 'idle',
};

// Async thunk to process payment
export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (paymentDetails: { amount: number; paymentMethod: string; orderId: string }, { rejectWithValue }) => {
    try {
      const response = await apiProcessPayment(paymentDetails); // Call the API function
      return response; // Return the response from the API
    } catch (error) {
      console.error('Error processing payment:', error); // Log error for debugging
      return rejectWithValue(error instanceof Error ? error.message : 'Payment processing failed'); // Provide a descriptive error message
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPayment: (state) => {
      return initialState; // Reset the payment state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true; // Set loading state
        state.error = null; // Reset error
        state.status = 'processing'; // Update status to processing
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state
        state.transactionId = action.payload.transactionId; // Store the transaction ID from the response
        state.status = 'success'; // Update status to success
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false; // Reset loading state
        state.error = action.payload as string; // Store the error message
        state.status = 'failed'; // Update status to failed
      });
  },
});

export const { resetPayment } = paymentSlice.actions; // Export reset action
export default paymentSlice.reducer; // Export the reducer
