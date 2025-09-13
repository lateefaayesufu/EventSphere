import axiosInstance from './axios';

export async function loginWithEmail(userDetails) {
  const { data } = await axiosInstance.post('auth/login', userDetails);
  return data;
}

export async function signup(userDetails) {
  const { data } = await axiosInstance.post('auth/signup', userDetails);
  return data;
}
