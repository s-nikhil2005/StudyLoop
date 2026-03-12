import api from "../api/axios";

export const loginUser = async (loginData) => {
    const response = await api.post("/users/login", loginData);
    return response.data;
} ;

export const registerUser = async (data) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

export const verifyRegisterOtp = async (data) => {
  const response = await api.post("/users/verify-otp", data);
  return response.data;
};

export const resendOtp = async (data) => {
  const response = await api.post("/users/resend-otp", data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post("/users/forget-password", data);
  return response.data;
};

export const verifyForgotPasswordOTP = async (data) => {
  const response = await api.post("/users/verify-forget-password-otp", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.patch("/users/reset-password", data);
  return response.data;
}

export const logoutUser = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    throw error;
  }
};

// export const getProfile = async () => {
//   const response = await api.get("/users/profile");
//   return response.data;
// };

export const editAccount = async (data) => {
  const response = await api.patch("/users/edit-account", data);
  return response.data;
};

export const verifyEmailUpdate = async (data) => {
  const response = await api.patch("/users/verify-email-update", data);
  return response.data;
};

export const deleteAccount = async (currentPassword) => {
  const response = await api.delete("/users/delete-account", {
    data: { currentPassword }
  });

  return response.data;
};