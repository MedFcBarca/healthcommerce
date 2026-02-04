import { useState } from "react";
import { createOrder } from "../lib/api";
import type { CartItem } from "./useCart";

export function useCheckout(params: {
  items: CartItem[];
  clearCart: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout(): Promise<string> {
    if (params.items.length === 0) throw new Error("Panier vide");

    try {
      setError(null);
      setLoading(true);

      const payload = {
        items: params.items.map((it) => ({
          product: `/api/products/${it.id}`, // IRI
          qty: it.qty,
          price: it.price,
        })),
      };

      const order: any = await createOrder(payload);

      //  id robuste (id ou @id)
      const orderId =
        order?.id ??
        (typeof order?.["@id"] === "string" ? order["@id"].split("/").pop() : undefined);

      if (!orderId) throw new Error("ID de commande introuvable");

      params.clearCart();
      return String(orderId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur commande";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { checkout, loading, error };
}
