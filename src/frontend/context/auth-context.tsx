import React, { createContext, useContext, useState } from 'react';
import {
  AuthUserType,
  login,
  LoginType,
  signup,
  SignUpType,
} from '../services/auth-service';

export type AuthTokenType = string;

export type AuthContextType = {
  token: AuthTokenType;
  user: AuthUserType;
};

export type AuthType = {
  user: AuthContextType;
  handleLogin: (
    { email, password }: LoginType,
    isLoginRemember: boolean
  ) => Promise<void>;
  handleSignUp: ({
    firstName,
    lastName,
    email,
    password,
  }: SignUpType) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext({} as AuthType);

const currentUser = 'ANI_NOTES_USER';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const initialUser: AuthContextType = JSON.parse(
    localStorage.getItem(currentUser) || '{}'
  );
  const [user, setUser] = useState<AuthContextType>(initialUser);

  const handleLogin = async (
    { email, password }: LoginType,
    isLoginRemember: boolean
  ) => {
    try {
      const { foundUser: user, encodedToken: token } = await login({
        email,
        password,
      });
      if (token && isLoginRemember) {
        localStorage.setItem(currentUser, JSON.stringify({ user, token }));
        setUser(JSON.parse(localStorage.getItem(currentUser) || '{}'));
      } else if (token) {
        setUser({ user, token });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async ({
    firstName,
    lastName,
    email,
    password,
  }: SignUpType) => {
    try {
      const { createdUser: user, encodedToken: token } = await signup({
        firstName,
        lastName,
        email,
        password,
      });
      if (token) {
        localStorage.setItem(currentUser, JSON.stringify({ user, token }));
        setUser(JSON.parse(localStorage.getItem(currentUser) || '{}'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(currentUser);
    setUser({} as AuthContextType);
  };

  const providerData = { user, handleLogin, handleLogout, handleSignUp };

  return (
    <AuthContext.Provider value={providerData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext) as AuthType;

export { useAuth, AuthProvider };
