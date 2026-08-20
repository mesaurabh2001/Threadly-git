import { createContext, useContext, useState } from "react";

import { loginUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    
    setIsLoggedIn(true);
    setUserId(data.userId);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        userId,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}