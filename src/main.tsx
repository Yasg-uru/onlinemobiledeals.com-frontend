import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./states/store.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./context/authcontext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
      <Provider store={store}>
    <AuthProvider>
        <Toaster />
        <App />
    </AuthProvider>
      </Provider>
  </ThemeProvider>
);
