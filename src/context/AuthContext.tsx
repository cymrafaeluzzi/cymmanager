import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isCompanyOwner: boolean;
  company?: {
    name: string;
    license: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    logo?: string;
  };
}

interface AuthContextType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  updateCompany: (companyData: Partial<User['company']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUser: User = {
  id: '1',
  name: 'María González',
  email: 'maria@example.com',
  phone: '(787) 555-0123',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  isCompanyOwner: true,
  company: {
    name: 'González Real Estate',
    license: 'RE-2024-001',
    address: 'Calle Principal 123, San Juan, PR 00901',
    phone: '(787) 555-0100',
    email: 'info@gonzalezrealestate.com',
    website: 'www.gonzalezrealestate.com',
    logo: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser);

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const updateCompany = (companyData: Partial<User['company']>) => {
    if (user && user.company) {
      setUser({
        ...user,
        company: { ...user.company, ...companyData }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, updateCompany }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};