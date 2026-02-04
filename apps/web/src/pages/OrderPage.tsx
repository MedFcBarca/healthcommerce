import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../lib/api";
import { euro } from "../lib/format";

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();

  const q = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id!),
    enabled: !!id,
  });

  if (q.isLoading) {
    return <div style={{ padding: 24 }}>Chargement...</div>;
  }

  if (q.isError || !q.data) {
    return <div style={{ padding: 24 }}>Commande introuvable</div>;
  }

  const order = q.data;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Merci 🎉</h1>
      <p>Commande #{order.id} créée.</p>
      <p>
        <strong>Total:</strong> {euro(order.total)}
      </p>

      <h3>Articles</h3>
      <ul>
        {order.items.map((it) => (
          <li key={it.id}>
            {it.qty} × {euro(it.price)} — {it.product}
          </li>
        ))}
      </ul>

      <Link className="btn primary" to="/">
        Retour boutique
      </Link>
    </div>
  );
}
