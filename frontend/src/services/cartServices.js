import api from "../api/axios";

/* ADD TO CART */
export const addToCart = async (itemId) => {
  const response = await api.post("/cart/add", {
    itemId,
  });
  return response.data;
};

/* GET USER CART */
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

/* REMOVE FROM CART */
export const removeFromCart = async (itemId) => {
  const response = await api.delete(`/cart/remove/${itemId}`);
  return response.data;
};