import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginController } from '../controllers/authController';

interface User {
  id: string;
  username: string;
  role: 'agent' | 'business_admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'agent' | 'business_admin') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string, role: 'agent' | 'business_admin'): Promise<boolean> => {
    const userData = await loginController(username, password);
    if (userData && userData.role === role) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate(role === 'agent' ? '/agent/dashboard' : '/admin/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/'); // Navigate to home page instead of login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};