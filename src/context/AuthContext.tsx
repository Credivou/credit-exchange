import React, { createContext, useState, useContext, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  createdAt: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  storeUserData: (userData: Omit<User, "id" | "createdAt">) => User;
  getUserData: () => User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load user data and login status from localStorage on initial load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const storeUserData = (userData: Omit<User, "id" | "createdAt">): User => {
    // Generate a simple unique ID
    const id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const createdAt = new Date().toISOString();
    
    const newUser = {
      ...userData,
      id,
      createdAt
    };
    
    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(newUser));
    return newUser;
  };

  const getUserData = (): User | null => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    // Note: We're not removing userData to keep the user's info for future logins
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, storeUserData, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
