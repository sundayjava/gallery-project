import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastCotext";
import Routs from "./Routs";
import { Provider } from "react-redux";
import store from "./contexts/redux/app/store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routs />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
