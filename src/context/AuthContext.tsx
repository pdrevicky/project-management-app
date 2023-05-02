import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { projectAuth } from "../firebase/config";
import firebase from "firebase";
import { AuthActionTypeEnum } from "../types/types";

type AuthContextType = {
  user: firebase.User | null;
  authIsReady: boolean;
  dispatch: (value: AuthAction) => void;
};

const MyAuthContext = {
  user: null,
  authIsReady: false,
  dispatch: () => {},
};

export const AuthContext = createContext<AuthContextType>(MyAuthContext);

type AuthAction = {
  type: AuthActionTypeEnum;
  payload: firebase.User | null;
};

interface AuthState {
  user: firebase.User | null;
  authIsReady: boolean;
}

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypeEnum.LOGIN:
      return { ...state, user: action.payload };
    case AuthActionTypeEnum.LOGOUT:
      return { ...state, user: null };
    case AuthActionTypeEnum.AUTH_IS_READY:
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
  // any props that come into the component
}

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: AuthActionTypeEnum.AUTH_IS_READY, payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
