import api from "./api";

const userService = {
  getProfile: async () => {
    const response = await api.get(
      "/users/profile"
    );

    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put(
      "/users/profile",
      profileData
    );

    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.put(
      "/users/change-password",
      passwordData
    );

    return response.data;
  },

  getAllUsersForAdmin: async () => {
    const response = await api.get(
      "/admin/users"
    );

    return response.data;
  },

  updateUserStatus: async (
    userId,
    enabled
  ) => {
    const response = await api.put(
      `/admin/users/${userId}/status`,
      {
        enabled,
      }
    );

    return response.data;
  },
};

export default userService;
