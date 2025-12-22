import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import UserProfile from "../pages/Authentication/user-profile";

// Dashboard and others
import Dashboard from "../pages/Dashboard/index";
import ReturnProducts from "../pages/Dashboard/ReturnProducts";
import EcommerceOrder from "../pages/Orders/Orders";            // Order listing
import OrderDetails from "../pages/Orders/Orders/OrderDetails"; // Individual order details

// Product/user/other example imports
import ProductType from "../pages/Products/ProductTypes/ProductType";
import AddProductType from "../pages/Products/ProductTypes/AddProductType";
import Colors from "../pages/Products/Colors/Colors";
import Product from "../pages/Products/Products/Product";
import AddProduct from "../pages/Products/Products/AddProduct";
import Inventory from "../pages/Inventory/Inventory";
import StockLedger from "../pages/Inventory/StockLedger/StockLedger";
// ... import additional components as needed

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPwd />} />

        {/* Auth-protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/return-products" element={<ReturnProducts />} />

        {/* Orders */}
        <Route path="/order" element={<EcommerceOrder />} />         {/* Order list page */}
        <Route path="/order/:orderId" element={<OrderDetails />} /> {/* Individual order details page */}

        {/* Example: product management pages */}
        <Route path="/products" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product-type" element={<ProductType />} />
        <Route path="/add-product-type" element={<AddProductType />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/stock-ledger" element={<StockLedger />} />
        {/* ...add more as needed */}

        <Route path="/profile" element={<UserProfile />} />

        {/* Default redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Catch-all unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// Define potential route lists (for use in other files)
export const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/register", component: <Register /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
];

export const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/return-products", component: <ReturnProducts /> },
  { path: "/order", component: <EcommerceOrder /> },
  { path: "/order/:orderId", component: <OrderDetails /> },
  { path: "/products", component: <Product /> },
  { path: "/add-product", component: <AddProduct /> },
  { path: "/product-type", component: <ProductType /> },
  { path: "/add-product-type", component: <AddProductType /> },
  { path: "/colors", component: <Colors /> },
  { path: "/inventory", component: <Inventory /> },
  { path: "/stock-ledger", component: <StockLedger /> },
  { path: "/profile", component: <UserProfile /> },
];

export default AppRouter;