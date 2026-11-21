import api from "./api";

const placeOrder = async (checkoutData) => {
  const response = await api.post("/orders", checkoutData);
  return response.data;
};

const getAllOrders = async () => {
  const response = await api.get("/admin/orders");
  return response.data;
};

const getMyOrder = async () => {
  const response = await api.get("/orders");
  return response.data;
}

const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(
    `/admin/orders/${orderId}/status`,
    { status }
  );
  return response.data;
};

export default {
  placeOrder,
  getAllOrders,
  getMyOrder,
  updateOrderStatus,
};