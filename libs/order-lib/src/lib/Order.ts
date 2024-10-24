import apiClient from '../../../api-client-lib/src/lib/api-client-lib';

// Order Model
export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  quantities: number[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  orderStatus: 'pending' | 'shipped' | 'delivered' | 'canceled';
  orderDate: string; // ISO string
  trackingInfo?: string; // Optional
  discounts?: string[]; // Optional
}

// Order Service
class OrderService {
  async createOrder(orderData: Order): Promise<Order> {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getOrder(orderId: string): Promise<Order> {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const response = await apiClient.get(`/users/${userId}/orders`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    try {
      await apiClient.patch(`/orders/${orderId}`, { status });
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(orderId: string): Promise<void> {
    try {
      await apiClient.delete(`/orders/${orderId}`);
    } catch (error) {
      throw error;
    }
  }

  async trackOrder(orderId: string): Promise<string> {
    try {
      const response = await apiClient.get(`/orders/${orderId}/tracking`);
      return response.data.trackingInfo;
    } catch (error) {
      throw error;
    }
  }
}

export const orderService = new OrderService();
