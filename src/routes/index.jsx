import React from "react";
import { Navigate } from "react-router-dom";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// // Dashboard
import Dashboard from "../pages/Dashboard/index";
import EcommerceOrder from "../pages/Ecommerce/EcommerceOrders";
import ProductType from "../pages/Products/ProductTypes/ProductType";
import Colors from "../pages/Products/Colors/Colors";
import AddColor from "../pages/Products/Colors/AddColor";
import AddProductType from "../pages/Products/ProductTypes/AddProductType";
import AddProduct from "../pages/Products/Products/AddProduct";
import Product from "../pages/Products/Products/Product";
import Materials from "../pages/Products/Materials/Materials";
import AddMaterial from "../pages/Products/Materials/AddMaterial";
import Shape from "../pages/Products/Shapes/Shape";
import AddShape from "../pages/Products/Shapes/AddShape";
import FrameWidth from "../pages/Products/FrameWidth/FrameWidth";
import AddFrameWidth from "../pages/Products/FrameWidth/AddFrameWidth";
import Dimension from "../pages/Products/Dimension/Dimension";
import AddDimension from "../pages/Products/Dimension/AddDimension";
import WeightGroup from "../pages/Products/WeightGroup/WeightGroup";
import AddWeightGroup from "../pages/Products/WeightGroup/AddWeightGroup";
import Address from "../pages/Users/Address/Address";
import AddAddress from "../pages/Users/Address/AddAddress";
import Membership from "../pages/Users/Membership/Membership";
import AddMembership from "../pages/Users/Membership/AddMembership";
import MembershipPlan from "../pages/Users/MembershipPlan/MembershipPlan";
import AddMembershipPlan from "../pages/Users/MembershipPlan/AddMembershipPlan";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/order", component: <EcommerceOrder /> },
  { path: "/products", component: <Product /> },
  { path: "/add-product", component: <AddProduct /> },
  { path: "/edit-product/:id", component: <AddProduct /> },
  { path: "/product-type", component: <ProductType /> },
  { path: "/add-product-type", component: <AddProductType /> },
  { path: "/edit-product-type/:id", component: <AddProductType /> },
  { path: "/colors", component: <Colors /> },
  { path: "/add-color", component: <AddColor /> },
  { path: "/edit-color/:id", component: <AddColor /> },
  { path: "/material", component: <Materials /> },
  { path: "/add-material", component: <AddMaterial /> },
  { path: "/edit-material/:id", component: <AddMaterial /> },
  { path: "/shape", component: <Shape /> },
  { path: "/add-shape", component: <AddShape /> },
  { path: "/edit-shape/:id", component: <AddShape /> },
  { path: "/frame-width", component: <FrameWidth /> },
  { path: "/add-frame-width", component: <AddFrameWidth /> },
  { path: "/edit-frame-width/:id", component: <AddFrameWidth /> },
  { path: "/dimension", component: <Dimension /> },
  { path: "/add-dimension", component: <AddDimension /> },
  { path: "/edit-dimension/:id", component: <AddDimension /> },
  { path: "/weight-group", component: <WeightGroup /> },
  { path: "/add-weight-group", component: <AddWeightGroup /> },
  { path: "/edit-weight-group/:id", component: <AddWeightGroup /> },
  { path: "/address", component: <Address /> },
  { path: "/add-address", component: <AddAddress /> },
  { path: "/edit-address/:id", component: <AddAddress /> },
  { path: "/membership", component: <Membership /> },
  { path: "/add-membership", component: <AddMembership /> },
  { path: "/edit-membership/:id", component: <AddMembership /> },
  { path: "/membership-plan", component: <MembershipPlan /> },
  { path: "/add-membership-plan", component: <AddMembershipPlan /> },
  { path: "/edit-membership-plan/:id", component: <AddMembershipPlan /> },

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes }
