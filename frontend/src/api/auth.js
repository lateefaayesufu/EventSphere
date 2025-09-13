import axiosInstance from './axios';

export async function loginWithEmail(userDetails) {
  const { data } = await axiosInstance.post('auth/login', userDetails);
  return data;
}
