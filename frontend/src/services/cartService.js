import api from "./api";

const cartService = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  addItem: async (productId, quantity = 1) => {
    const response = await api.post("/cart/items", {
      productId,
      quantity,
    });

    return response.data;
  },

  updateItemQuantity: async (cartItemId, quantity) => {
    const response = await api.put(
      `/cart/items/${cartItemId}`,
      {
        quantity,
      }
    );

    return response.data;
  },

  removeItem: async (cartItemId) => {
    const response = await api.delete(
      `/cart/items/${cartItemId}`
    );

    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete("/cart");

    return response.data;
  },

  applyCoupon: async (couponCode) => {
    const response = await api.post(
      "/cart/coupon",
      {
        couponCode,
      }
    );

    return response.data;
  },
};

export default cartService;
