// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function register({ name, email, password }) {
    // naive register: accept anything
    const newUser = { id: Date.now().toString(), name, email };
    setUser(newUser);
    return newUser;
  }

  function login({ email }) {
    // naive login: just set name from email
    const u = { id: Date.now().toString(), name: email.split("@")[0], email };
    setUser(u);
    return u;
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
