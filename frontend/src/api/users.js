import api from "./axios";

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
