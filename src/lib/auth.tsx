import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AuthContext = createContext(null);

interface AuthProviderProps {
  children: ReactNode; // Explicitly type children
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  // Logic to check user authentication status
  useEffect(() => {
    const fetchUser = async () => {
      // Example: Fetch user from local storage or API
      const fetchedUser = await getUserFromAPI(); // Replace with your logic
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 