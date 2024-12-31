import "./App.css";
import AddProductPage from "./pages/createproduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/navbar";
import LoginPage from "./pages/Login";

import Products from "./pages/product";
import { UpdateProductPage } from "./pages/updateproduct";
import { useAuthContext } from "./context/authcontext";
import RegisterPage from "./pages/register";
import VerifyOTP from "./pages/otp";
import { ProductDetailsPage } from "./pages/product-details";

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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp/:email" element={<VerifyOTP/>}/>
        <Route path="/" element={<Products />} />
        <Route
          path="/update-product/:productId"
          element={<UpdateProductPage />}
        />
        <Route path="/details/:id" element={<ProductDetailsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
