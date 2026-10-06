import api from "./api";

const getAllOrders = async () => {
  const response =
    await api.get("/admin/orders");

  return response.data;
};

const updateOrderStatus = async (
  orderId,
  status
) => {
  const response =
    await api.put(
      `/admin/orders/${orderId}/status`,
      { status }
    );

  return response.data;
};

export default {
  getAllOrders,
  updateOrderStatus,
};
