import api from "./api";

const buildFormData = ({ name, category, price, imageFile }) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("category", category);
  formData.append("price", price);
  if (imageFile) {
    formData.append("image", imageFile);
  }
  return formData;
};

const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

const createProduct = async (product) => {
  const response = await api.post("/admin/products", buildFormData(product));
  return response.data;
};

const updateProduct = async (productId, product) => {
  const response = await api.put(`/admin/products/${productId}`, buildFormData(product));
  return response.data;
};

const deleteProduct = async (productId) => {
  await api.delete(`/admin/products/${productId}`);
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};