import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProtectedRouteUser from "./routes/ProtectedRouteUser";
import AuthProvider from "./providers/AuthProvider";
import Products from "./pages/Products";
import UsersPage from "./pages/UsersPage";
import AddNewProduct from "./pages/AddNewProduct";
import UpdateProduct from "./pages/UpdateProduct";
import ProductsListAdmin from "./pages/ProductsListAdmin";
import OrderConfirmed from "./pages/OrderConfirmed";
import ProfilePage from "./pages/ProfilePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import UpdateOrderStatusAdmin from "./pages/UpdateOrderStatusAdmin";
import AdminDashboard from "./pages/Dashboard";
import ProtectedRouteAdmin from "./routes/ProtectedRouteAdmin";

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route element={<ProtectedRouteUser />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route element={<ProtectedRouteAdmin />}>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/add-new-product" element={<AddNewProduct />} />
            <Route path="/products-list" element={<ProductsListAdmin />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/orders" element={<UpdateOrderStatusAdmin />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="/category/:name/:id" element={<Products />} />
        </Route>

        {/* <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<RecentActivity />} />
        <Route path="project/:id" element={<Project />} />
      </Route> */}
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
