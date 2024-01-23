import React, { Dispatch, ReactNode, createContext, useReducer } from "react";

interface CustomeContextType {
  state: any;
  dispatch: Dispatch<any>;
}

export const ToastContext = createContext<CustomeContextType | undefined>(
  undefined
);

const initialState = {
  toastMessage: "",
  isOpen: true,
  path: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SNACKBAR":
      return {
        ...state,
        toastMessage: action.payload.message,
      };
    case "SETPATH":
      return {
        ...state,
        path: action.payload.path,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
};

export const showToast = (dispatch: any, message: string, timeout = 300) => {
  dispatch({
    type: "SNACKBAR",
    payload: { message },
  });

  setTimeout(() => {
    dispatch({
      type: "SNACKBAR",
      payload: {
        message: "",
      },
    });
  }, timeout);
};

export const ToastProvider:React.FC<{children:ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ToastContext.Provider value={{state, dispatch}}>
      {children}
    </ToastContext.Provider>
  )
}
