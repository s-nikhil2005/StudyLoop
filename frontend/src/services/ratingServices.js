import api from "../api/axios"; // same axios instance you used

// ⭐ ADD RATING
export const addRating = async (data) => {
  const response = await api.post("/ratings", data);
  return response.data;
};

// ⭐ GET RATINGS
export const getRatings = async ({ type, id }) => {
  const response = await api.get(`/ratings?type=${type}&id=${id}`);
  return response.data;
};

// ⭐ GET USER OVERALL RATING (🔥 NEW)
export const getUserOverallRating = async (userId) => {
  const response = await api.get(`/ratings/user-rating/${userId}`);
  return response.data;
};