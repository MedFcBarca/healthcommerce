import { useEffect, useMemo, useState } from "react";
import { loadJSON, saveJSON } from "../lib/storage";
import type { Product } from "../lib/api";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

const CART_KEY = "greenshop_cart_v1";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => loadJSON(CART_KEY, []));

  useEffect(() => {
    saveJSON(CART_KEY, items);
  }, [items]);

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  function add(product: Product) {
    setItems((prev) => {
      const exist = prev.find((x) => x.id === product.id);
      if (exist) return prev.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  }

  function inc(id: number) {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
  }

  function dec(id: number) {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x)).filter((x) => x.qty > 0)
    );
  }

  function remove(id: number) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function clear() {
    setItems([]);
  }

  return { items, setItems, count, total, add, inc, dec, remove, clear };
}
