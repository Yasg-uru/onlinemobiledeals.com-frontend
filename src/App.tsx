import "./App.css";
import AddProductPage from "./pages/createproduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/navbar";
import LoginPage from "./pages/Login";

import Products from "./pages/product";
import { UpdateProductPage } from "./pages/updateproduct";
import { useAuthContext } from "./context/authcontext";

function App() {
  const { user, isAuthenticated } = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {user && isAuthenticated && user.Role === "admin" && (
          <Route path="/add-product" element={<AddProductPage />} />
        )}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Products />} />
        <Route
          path="/update-product/:productId"
          element={<UpdateProductPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
