import React, {
  createContext,
  useEffect,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import AuthSDK from "../utils/AuthSDK";
import Cookies from "js-cookie";

interface CustomeContextType {
  state: any;
  dispatch: Dispatch<any>;
}

export const AuthContext = createContext<CustomeContextType | undefined>(
  undefined
);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      const { user, token } = action.payload;
      Cookies.set("token", token, { expires: 7 });
      return {
        ...state,
        isAuthenticated: true,
        user,
        token,
      };
    case "LOGOUT":
      Cookies.remove("token")
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const tokenExpireError = (dispatch: any, errorMessage: any) => {
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/";
  }
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          const sdk = AuthSDK();
          const user = await sdk.check(token);

console.log(user)
          dispatch({
            type: "LOGIN",
            payload: { user, token },
          });
        } catch (error) {
          console.log("Authentication check failed:", error);
          dispatch({ type: "LOGOUT" });
        }
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;