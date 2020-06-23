import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {};

//TODO: Decode token
if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

//TODO: Create Context
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

//TODO: Create Reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
  }
}

//TODO: Create Provider
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }
  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }
  //TODO: Return context&provider
  return (
    <AuthContext.Provider
      value={{ login, logout, user: state.user }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
