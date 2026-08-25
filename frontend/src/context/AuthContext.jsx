import { createContext, useContext, useState, useEffect } from "react";

import { findInitialUser, loginUser, logoutUser, signupUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userObj = await findInitialUser();

        if (userObj) {
          setUser(userObj);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);


  const login = async (username, password) => {
    const response = await loginUser(username, password);
    setUser(response.user);
  }
  const logout = async () => {
    await logoutUser();
    setUser(null);
  }

  const signup = async (dataObj) => {
    const response = await signupUser(dataObj);
    setUser(response.user);
  }


  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}