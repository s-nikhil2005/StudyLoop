import api from "../api/axios";

/* CREATE CARD */
export const createCard = async (data) => {
  const response = await api.post("/cards/create-card", data);
  return response.data;
};

/* GET USER CARDS */
export const getUserCards = async () => {
  const response = await api.get("/cards/my-cards");
  return response.data;
};

/* SEARCH CARDS */
export const searchCards = async (params) => {
  const response = await api.get("/cards/search", { params });
  return response.data;
};

/* GET SINGLE CARD */
export const getCard = async (id) => {
  const response = await api.get(`/cards/${id}`);
  return response.data;
};

/* DELETE CARD */
export const deleteCard = async (id) => {
  const response = await api.delete(`/cards/${id}`);
  return response.data;
};


export const updateCardImage = async (cardId, data) => {

  const response = await api.patch(
    `/cards/${cardId}/image`,
    data
  );

  return response.data;

};