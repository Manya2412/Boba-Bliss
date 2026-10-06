import api from "./api";

const authService = {
  register: async (registrationData) => {
    const response = await api.post(
      "/auth/register",
      registrationData
    );

    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post(
      "/auth/login",
      credentials
    );

    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");

    return response.data;
  },

  logout: async () => {
    try {
      await api.post("*auth/logout");
    } finally {
      localStorage.removeItem("token")
      localStorage.removeItem("user");
    }
  },
};

export default authService;
