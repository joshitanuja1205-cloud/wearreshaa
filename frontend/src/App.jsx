import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryShowcase from "./components/CategoryShowcase";
import ProductSection from "./components/ProductSection";
import CustomizeSection from "./components/CustomizeSection";
import ReshaaStory from "./components/ReshaaStory";
import WhyReshaa from "./components/WhyReshaa";
import OurWorld from "./components/OurWorld";
import Footer from "./components/Footer";

import Shop from "./components/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import Customize from "./pages/Customize";


function Home() {
  return (
    <>
      <Hero />

      <CategoryShowcase />

      <ProductSection />

      <CustomizeSection />

      <ReshaaStory />

      <WhyReshaa />

      <OurWorld />

      <Footer />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= SHOP ================= */}

        <Route
          path="/shop"
          element={<Shop />}
        />


        {/* ================= PRODUCT DETAILS ================= */}

        <Route
          path="/product/:slug"
          element={<ProductDetails />}
        />


        {/* ================= CART ================= */}

        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= WISHLIST ================= */}

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />


        {/* ================= CHECKOUT ================= */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />


        {/* ================= ORDER SUCCESS ================= */}

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />


        {/* ================= CUSTOMIZE ================= */}

        <Route
          path="/customize"
          element={<Customize />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;