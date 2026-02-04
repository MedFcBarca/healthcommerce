import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import FavoritesPage from "../pages/FavoritesPage";
import { useFavorites } from "../hooks/useFavorites";
import type { Product } from "../lib/api";
import { useOutletContext } from "react-router-dom";
import ProductPage from "@/pages/ProductPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import CheckoutPage from "@/pages/CheckoutPage"; 

type LayoutCtx = {
  openCart: () => void;
  cart: {
    count: number;
    add: (p: Product) => void;
  };
};

function HomeWrapper() {
  const { openCart, cart } = useOutletContext<LayoutCtx>();
  const fav = useFavorites();

  return (
    <HomePage
      cartCount={cart.count}
      onOpenCart={openCart}
      onAddCart={(p) => {
        cart.add(p);
        openCart();
      }}
      favoritesCount={fav.ids.length}
      isFav={fav.isFav}
      onToggleFav={fav.toggle}
    />
  );
}

function FavoritesWrapper() {
  const fav = useFavorites();
  return (
    <FavoritesPage favorites={fav.ids} products={fav.products} onToggleFav={fav.toggle} />
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/favorites" element={<FavoritesWrapper />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/checkout" element={<CheckoutPage />} /> 

        <Route path="/confirmation/:id" element={<ConfirmationPage />} />
      </Route>
    </Routes>
  );
}
