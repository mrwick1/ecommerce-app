import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ProfilePage from "../pages/profile";
import HomePage from "../pages/home";
import Header from "../components/Header/Header";
import ProductDetailPage from "../pages/product-detail/productDetail";
import PrivateRoute from "./private";

const Navigator = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Navigator;
