import React, { createContext, useReducer, useContext } from 'react';

// Initial state for the authentication context
const initialState = {
  isAuthenticated: false,
  fullName: null,
  role: null,
  id: null,
};

// Reducer function to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        fullName: action.payload.fullName,
        role: action.payload.role,
        id: action.payload.id,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Create the Auth Context
export const AuthContext = createContext(initialState);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
