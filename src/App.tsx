import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastCotext";
import Routs from "./Routs";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routs />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
