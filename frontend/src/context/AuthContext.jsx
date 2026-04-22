import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../api/api';

const AuthContext = createContext();
const USER_STORAGE_KEY = 'estilonorte.user';
const TOKEN_STORAGE_KEY = 'estilonorte.token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  async function login(formData) {
    setLoading(true);
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  async function register(formData) {
    setLoading(true);
    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
