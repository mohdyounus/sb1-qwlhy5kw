import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Hardcoded credentials for demo
const VALID_CREDENTIALS = {
  agent: { username: 'agent001', password: 'test123' },
  admin: { username: 'admin', password: 'admin123' }
};

interface User {
  username: string;
  role: 'agent' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'agent' | 'admin') => Promise<boolean>;
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

  const login = async (username: string, password: string, role: 'agent' | 'admin'): Promise<boolean> => {
    const validCreds = role === 'agent' ? VALID_CREDENTIALS.agent : VALID_CREDENTIALS.admin;
    
    if (username === validCreds.username && password === validCreds.password) {
      const userData = { username, role };
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