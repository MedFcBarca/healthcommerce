import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import { useCart } from "../hooks/useCart";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <>
      <Outlet context={{ openCart: () => setOpen(true), cart }} />

      <CartDrawer
        open={open}
        onClose={() => setOpen(false)}
        items={cart.items}
        total={cart.total}
        onInc={cart.inc}
        onDec={cart.dec}
        onRemove={cart.remove}
        onClear={cart.clear}
        onCheckout={() => {
          setOpen(false);
          navigate("/checkout");
        }}
      />
    </>
  );
}
