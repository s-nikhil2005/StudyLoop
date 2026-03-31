import api from "../api/axios";

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await api.get(`/profile/user/${userId}`);
  return response.data;
};


export const updateProfileInfo = async (data) => {
  const response = await api.patch("/profile/update-basic-info", data);
  return response.data;
}

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append("profilePhoto", file); // ⚠ must match backend

  const response = await api.patch("/profile/photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const removeProfilePhoto = async () => {
  const response = await api.delete("/profile/photo");
  return response.data;
};

export const deleteProfile = async () => {
  const response = await api.delete("/profile");
  return response.data;
};

export const updateLearningSkills = async (subjects) => {
  const response = await api.patch("/profile/learning-goals", {
    subjects
  });
  return response.data;
};

export const updateTeachingSkills = async (subjects) => {
  const response = await api.patch("/profile/teaching-skills", {
    subjects
  });
  return response.data;
};

