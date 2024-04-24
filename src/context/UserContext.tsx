import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/userType";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

type Action =
  | { type: "SET_USER"; user: User | null }
  | { type: "LOGOUT" }
  | { type: "SET_AUTHENTICATED"; authenticated: boolean }
  | { type: "SET_LOADING"; loading: boolean };

type State = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderType {
  children: React.ReactNode;
}

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "LOGOUT":
      return { ...state, user: null, authenticated: false };
    case "SET_AUTHENTICATED":
      return { ...state, authenticated: action.authenticated };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

export const UserProvider: React.FC<UserProviderType> = ({ children }) => {
  const navigation = useNavigate();
  const [state, dispatch] = useReducer(userReducer, {
    user: JSON.parse(localStorage.getItem("currentUser") || "null"),
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    const safeUser = state.user ? { ...state.user, password: undefined } : null;
    localStorage.setItem("currentUser", JSON.stringify(safeUser));
  }, [state.user]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "LOGOUT" });
    navigation("/login");
  };

  console.log(state, "akr");

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser: (user) => dispatch({ type: "SET_USER", user }),
        logout,
        authenticated: state.authenticated,
        setAuthenticated: (authenticated) =>
          dispatch({ type: "SET_AUTHENTICATED", authenticated }),
        loading: state.loading,
        setLoading: (loading) => dispatch({ type: "SET_LOADING", loading }),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
