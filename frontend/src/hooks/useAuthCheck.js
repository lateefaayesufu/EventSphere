import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

const fetchAuthStatus = async () => {
  const response = await axios.get('/auth/check');
  return response.data;
};

export const useAuthCheck = () => {
  const { dispatch } = useAuth();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['authStatus'],
    queryFn: fetchAuthStatus,
    retry: 3, // Retry 3 times on failure
    staleTime: Infinity, // Keep data fresh indefinitely, re-fetch on mount
    onSuccess: (data) => {
      if (data?.user) {
        dispatch({
          type: 'LOGIN',
          payload: {
            fullName: data.user.fullName,
            role: data.user.role,
            id: data.user.id,
          },
        });
      }
    },
    onError: () => {
      dispatch({ type: 'LOGOUT' });
    },
  });

  return { isLoading, isError, data, error };
};
