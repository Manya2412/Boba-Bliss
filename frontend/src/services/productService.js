import api from "./api";

const getProducts = async () => {

  const response =
    await api.get("/products");

  return response.data;
};

const createProduct = async (
  product
) => {

  const response =
    await api.post(
      "/admin/products",
      product
    );

  return response.data;
};

const deleteProduct = async (
  productId
) => {

  await api.delete(
    `/admin/products/${productId}`
  );
};

export default {
  getProducts,
  createProduct,
  deleteProduct,
};
